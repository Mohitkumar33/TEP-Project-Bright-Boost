import { createContext, useContext, useState, useEffect } from "react";
// import { useEffect } from "react";

const authContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    // isAuth: localStorage.getItem("token") ? true : false,
    // userInfo: localStorage.userName ? localStorage.userName : null,
  });
  useEffect(() => {
    setAuthState({
      isAuth: localStorage.token ? true : false,
      userInfo: localStorage.fullName ? localStorage.fullName : null,
    });
  }, []);
  return (  
    <authContext.Provider value={{ authState, setAuthState }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider };
