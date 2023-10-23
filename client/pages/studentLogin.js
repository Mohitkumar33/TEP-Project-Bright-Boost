import { useAuth } from "@/components/context/auth-context";
import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utilities/apiConfig"; // Import your Axios instance
import { useToast } from "@chakra-ui/react";

const StudentLogin = () => {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { authState, setAuthState } = useAuth();
  const toast = useToast();

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

  const loginApi = async (email, password) => {
    if (isCurrentTimeInRange()) {
      // console.log(
      //   "Current time is within the specified range. You can run your function."
      // );

      try {
        const { data } = await api.post("/auth/studentLogin", {
          email: email,
          password: password,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("type", data.type);
        localStorage.setItem("email", data.email);
        localStorage.setItem("studentId", data.studentId);
        setAuthState({
          isAuth: true,
          userInfo: data.fullName,
        });
        toast({
          title: "Success",
          description: "Login Successful",
          status: "success",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
        router.push("/dashboard/studentDashboard");
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description:
          "Please login when the session starts. Between 3:30pm to 5:30 pm",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  console.log(authState, "this is auth state");
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
        Student Login
      </h1>
      <div style={{ textAlign: "center" }}>
        <div>Email:</div>
        <input
          onChange={(e) => setEmailInput(e.target.value)}
          style={{ border: "1px solid black" }}
        />
        <div>Password:</div>
        <input
          onChange={(e) => setPasswordInput(e.target.value)}
          type="password"
          style={{ border: "1px solid black" }}
        />
        <br />
        <button
          style={{
            border: "1px solid black",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
          onClick={() => loginApi(emailInput, passwordInput)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;
