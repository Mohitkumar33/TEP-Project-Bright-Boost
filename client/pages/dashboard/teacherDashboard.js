import {
    allQuestions,
    allSubjects,
    allTeachers,
    closeQuestion,
  } from "@/utilities/studentApi";
  import { useEffect, useState } from "react";
  import { useToast } from "@chakra-ui/react";
  
  const TeacherDashboard = () => {
    const [subjects, setSubjects] = useState();
    const [teachers, setTeachers] = useState();
    const [questions, setQuestions] = useState();
    const toast = useToast();
    // const [subIds, setSubIds] = useState();
    const [teacherQuestions, setTeacherQuestions] = useState();
  
    useEffect(() => {
      allSubjects()
        .then((data) => setSubjects(data))
        .catch((error) => {
          console.error("Error fetching subjects data:", error);
        });
      allTeachers()
        .then((data) => setTeachers(data))
        .catch((error) => {
          console.error("Error fetching teachers data:", error);
        });
    }, []);
    useEffect(() => {
      allQuestions()
        .then((data) => setQuestions(data))
        .catch((error) => {
          console.error("Error fetching questions data:", error);
        });
    }, [questions]);
  
    useEffect(() => {
      const subIds = subjects
        ?.filter((item) => item.teacherIDs == localStorage.getItem("teacherId"))
        .map((item) => item.id);
      const que = questions?.filter(
        (item) => subIds?.includes(item.subjectID) && item.status == "assigned"
      );
      setTeacherQuestions(que);
    }, [subjects, teachers, questions]);
  
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
    const closeTheQuestion = (qId) => {
      const dataToSend = {
        id: qId,
        closeTime: getCurrentDateTime(),
      };
      closeQuestion(dataToSend, toast);
      setQuestions((prevData) => {
        prevData.filter((item) => item.id != qId);
      });
      // console.log(dataToSend, "data to send");
    };
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          Teacher dashboard
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {teacherQuestions?.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  border: "1px solid black",
                  width: "20rem",
                  padding: "5px",
                }}
              >
                <div>Asked by: {item.studentName}</div>
                <div>Subject name: {item.subjectName}</div>
                <div>Date and time: {item.openAt}</div>
                {item.question}?
                <button
                  style={{ border: "1px solid black", marginLeft: "2rem" }}
                  onClick={() => closeTheQuestion(item.id)}
                >
                  Close
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default TeacherDashboard;
  