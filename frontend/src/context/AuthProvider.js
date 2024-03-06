import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const [auth, setAuth] = useState({
  //   user:{
  //       username: "admin",
  //       password: "admin"
  //   },
  //   role : 'ADMIN',
  // });
  const [auth, setAuth] = useState({
    user: null,
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
