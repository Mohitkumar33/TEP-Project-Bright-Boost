import { useAuth } from "@/components/context/auth-context";
import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utilities/apiConfig"; // Import your Axios instance

const StudentLogin = () => {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { authState, setAuthState } = useAuth();

  const loginApi = async (email, password) => {
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
      router.push("/dashboard/studentDashboard");
    } catch (error) {
      console.log(error);
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
