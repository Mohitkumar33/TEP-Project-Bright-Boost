import { allSubjects, postQuestion } from "@/utilities/studentApi";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { TeacherTimeTable } from "@/components/bbStrap";

const StudentDashboard = () => {
  const [allSubjectsData, setAllSubjectsData] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [question, setQuestion] = useState("");
  const [showTimeTable, setShowTimeTable] = useState(false);
  const toast = useToast();

  function getCurrentDateTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function isCurrentTimeInRange() {
    // Get the current date and time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Define the start and end times for your range
    const startTime = 15; // 3:00 PM
    const endTime = 17; // 5:59 PM

    // Check if the current time is within the range
    if (
      (currentHour > startTime ||
        (currentHour === startTime && currentMinute >= 30)) &&
      (currentHour < endTime ||
        (currentHour === endTime && currentMinute <= 30))
    ) {
      return true; // Current time is within the specified range
    } else {
      return false; // Current time is outside the specified range
    }
  }

  const submitQuestion = (subId, ques) => {
    if (isCurrentTimeInRange()) {
      const dataToSend = {
        studentName: localStorage.getItem("fullName"),
        studentID: localStorage.getItem("studentId"),
        question: ques,
        subjectName: allSubjectsData?.find((item) => item.id == subId)
          .subjectName,
        subjectID: subId,
        openAt: getCurrentDateTime(),
      };
      postQuestion(dataToSend, toast);
      console.log(dataToSend, "data to send");
    } else {
      toast({
        title: "Error",
        description: "Student can only ask the question in the session. Between 3:30 to 5:30 ",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    allSubjects()
      .then((data) => {
        setAllSubjectsData(data);
      })
      .catch((error) => {
        console.error("Error fetching subjects data:", error);
      });
  }, []);
  // console.log(selectedSubject, "selected subject");
  // console.log(allSubjectsData, "all sub data");
  const currentDate = new Date();
  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = currentDate.getDay();
  console.log(dayOfWeek, "this is day of week");

  // Define an array of day names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const DaysSubjects = {
    Sunday: ["Holiday"],
    Monday: ["English", "Sports"],
    Tuesday: ["Maths", "Science"],
    Wednesday: ["Computers"],
    Thursday: ["Science", "Maths"],
    Friday: ["Sports", "English"],
    Saturday: ["Holiday"],
  };
  return (
    <div>
      <button
        style={{
          border: "1px solid black",
          height: "2rem",
          width: "8rem",
          margin: "3rem 0 3rem 45%",
          color: "white",
          backgroundColor: "blue",
        }}
        onClick={() => setShowTimeTable((prevState) => !prevState)}
      >
        TimeTable
      </button>
      {showTimeTable && (
        <button
          style={{
            border: "1px solid blue",
            height: "2rem",
            width: "8rem",
            marginLeft: "3rem",
            color: "blue",
            backgroundColor: "#D0D0D0",
          }}
          onClick={() => setShowTimeTable(false)}
        >
          Close Time table
        </button>
      )}

      {showTimeTable && <TeacherTimeTable />}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          fontSize: "1.5rem",
          fontWeight: "700",
        }}
      >
        Student dashboard
      </h1>
      {/* {console.log(
        allSubjectsData?.filter((item) =>
          DaysSubjects[daysOfWeek[dayOfWeek]].includes(item.subjectName)
        ),
        "hi",
        DaysSubjects[daysOfWeek[dayOfWeek]]
      )} */}
      <div style={{ textAlign: "center" }}>
        {allSubjectsData?.filter((item) =>
          DaysSubjects[daysOfWeek[dayOfWeek]]?.includes(item.subjectName)
        ).length !== 0 && <p>Please select the subject</p>}
        {allSubjectsData
          ?.filter((item) =>
            DaysSubjects[daysOfWeek[dayOfWeek]]?.includes(item.subjectName)
          )
          .map((subject) => (
            <div key={subject.id}>
              {/* <label> */}
              <input
                type="radio"
                value={subject.id}
                name="select_subject"
                onChange={(e) => setSelectedSubject(e.target.value)}
              />
              {subject.subjectName}
              {/* </label> */}
            </div>
          ))}
        {allSubjectsData?.filter((item) =>
          DaysSubjects[daysOfWeek[dayOfWeek]]?.includes(item.subjectName)
        ).length === 0 ? (
          <div>Today is holiday </div>
        ) : (
          <div>
            {" "}
            <p style={{ marginTop: "1rem", marginBottom: "5px" }}>
              Please enter the question detail:
            </p>
            <input
              type="text"
              onChange={(e) => setQuestion(e.target.value)}
              style={{ border: "1px solid black", marginBottom: "2rem" }}
            />
            <button
              style={{ border: "1px solid black", marginLeft: "1rem" }}
              onClick={() => submitQuestion(selectedSubject, question)}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
