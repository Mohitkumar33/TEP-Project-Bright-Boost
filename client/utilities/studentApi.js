import api from "../utilities/apiConfig";
export const allSubjects = async () => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await api.get("/api/subjects", config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const allTeachers = async () => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await api.get("/api/teachers", config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const allStudents = async () => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await api.get("/api/students", config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const allQuestions = async () => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await api.get("/api/questions", config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const studentsAttendence = async () => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await api.get("/api/attendence", config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const postQuestion = async (question, toast) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const data = await api.post("/api/questions", question, config);
    toast({
      title: "Success",
      description: "Question Submitted",
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
      status: "error",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    throw error;
  }
};

export const closeQuestion = async (questionData, toast) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const data = await api.post("/api/questions/close", questionData, config);
    toast({
      title: "Success",
      description: "Question Closed",
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
      status: "error",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    throw error;
  }
};
