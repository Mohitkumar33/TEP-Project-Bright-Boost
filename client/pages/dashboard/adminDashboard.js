import { useAuth } from "@/components/context/auth-context";
import {
  allQuestions,
  allSubjects,
  allTeachers,
  studentsAttendence,
  allStudents,
} from "@/utilities/studentApi";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { authState } = useAuth();
  const [subjects, setSubjects] = useState();
  const [teachers, setTeachers] = useState();
  const [students, setStudents] = useState();
  const [questions, setQuestions] = useState();
  const [attendence, setAttendence] = useState();
  const [date, setDate] = useState();

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
    allQuestions()
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.error("Error fetching questions data:", error);
      });
    studentsAttendence()
      .then((data) => setAttendence(data))
      .catch((error) => {
        console.error("Error fetching attendence data:", error);
      });
    allStudents()
      .then((data) => setStudents(data))
      .catch((error) => {
        console.error("Error fetching students data:", error);
      });
  }, []);

  function countQuestionsBySubject(data) {
    const subjectCounts = {};

    // Iterate through the data and count questions for each subject
    data?.forEach((item) => {
      const subjectName = item.subjectName;

      if (subjectCounts[subjectName]) {
        subjectCounts[subjectName]++;
      } else {
        subjectCounts[subjectName] = 1;
      }
    });

    // Convert the subjectCounts object into an array of objects
    const resultArray = Object.entries(subjectCounts).map(
      ([subjectName, count]) => ({
        subjectName,
        count,
      })
    );

    return resultArray;
  }

  function findStudentWithMaxOccurrences(data) {
    const studentCounts = {}; // An object to store student name counts
    let maxStudent = null;
    let maxCount = 0;

    data?.forEach((item) => {
      const studentName = item.studentName;
      if (studentCounts[studentName]) {
        studentCounts[studentName]++;
      } else {
        studentCounts[studentName] = 1;
      }

      if (studentCounts[studentName] > maxCount) {
        maxCount = studentCounts[studentName];
        maxStudent = studentName;
      }
    });

    return maxStudent;
  }

  function countClosedStatus(data) {
    let closedCount = 0;
    data?.forEach((item) => {
      if (item.status === "closed") {
        closedCount++;
      }
    });
    return closedCount;
  }

  function getUniqueStudentNamesForDate(date, data) {
    const uniqueStudentNames = new Set();
    data?.forEach((item) => {
      const itemDate = item.date.split("T")[0]; // Extract the date part
      if (itemDate === date) {
        uniqueStudentNames.add(item.studentName);
      }
    });
    return Array.from(uniqueStudentNames);
  }

  function findMostFrequentSubject(data) {
    // Create an object to store the subject name counts
    const subjectCounts = {};

    // Iterate through the data and count the occurrences of each subject name
    data?.forEach((item) => {
      const subjectName = item.subjectName;
      subjectCounts[subjectName] = (subjectCounts[subjectName] || 0) + 1;
    });

    let mostFrequentSubject = "";
    let maxCount = 0;

    // Find the subject name with the highest count
    for (const subjectName in subjectCounts) {
      if (subjectCounts[subjectName] > maxCount) {
        mostFrequentSubject = subjectName;
        maxCount = subjectCounts[subjectName];
      }
    }

    return {
      subject: mostFrequentSubject,
      count: maxCount,
    };
  }

  function findQuestionWithMaxTimeDifference(data) {
    let maxTimeDifference = 0;
    let questionWithMaxTimeDifference = {};

    data?.forEach((item) => {
      const openAt = new Date(item.openAt);
      const closeAt = new Date(item.closeAt);

      if (!isNaN(openAt) && !isNaN(closeAt)) {
        const timeDifference = closeAt - openAt;

        if (timeDifference > maxTimeDifference) {
          maxTimeDifference = timeDifference;
          questionWithMaxTimeDifference = {
            question: item.question,
            timeDifference: timeDifference,
        };
        }
      }
    });

    return questionWithMaxTimeDifference;
  }
  console.log(teachers);
  console.log(students);
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
        Admin dashboard
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          <h2>All teachers registered with bright boost</h2>
          {teachers?.map((item) => {
            return <div key={item.id}>{item.fullName}</div>;
          })}
        </div>
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          <h2>All Students registered with Bright boost</h2>
          {students?.map((item) => {
            return <div key={item.id}>{item.fullName}</div>;
          })}
        </div>
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          <h2>All Subjects that bright boost teach</h2>
          {subjects?.map((item) => {
            return <div key={item.id}>{item.subjectName}</div>;
          })}
        </div>
        {/* <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          <h2>All the questions asked by students</h2>
          {questions?.map((item) => {
            return <div key={item.id}>{item.question}</div>;
          })}
        </div> */}
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          <p>Subject with maximum number of questions</p>
          <div>
            {findMostFrequentSubject(questions).subject}{" "}
            <span>{findMostFrequentSubject(questions).count}</span>
          </div>
        </div>
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          Quesion which took maximum time
          <div>{findQuestionWithMaxTimeDifference(questions).question}</div>
          <div>{(findQuestionWithMaxTimeDifference(questions).timeDifference/(1000 * 60 * 60)).toFixed(2)} hours</div>
        </div>
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          Number of students attending the class on selected date
          <br></br>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <div>
            {getUniqueStudentNamesForDate(date, attendence).map((item) => {
              return <div>{item}</div>;
            })}
          </div>
        </div>
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          Total Answered Questions
          <div>{countClosedStatus(questions)}</div>
        </div>
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          Total Unanswered Questions{" "}
          <div>{questions?.length - countClosedStatus(questions)}</div>
        </div>
        {/* <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          Maximum Questions Answered by which teacher
        </div> */}
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          Student who asked most of the questions
          <div>{findStudentWithMaxOccurrences(questions)}</div>
        </div>
        <div
          style={{ height: "10rem", width: "20rem", border: "1px solid black" }}
        >
          Question asked in each subject
          <div>
            {countQuestionsBySubject(questions).map((item) => {
              return (
                <div>
                  {item.subjectName} {item.count}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
