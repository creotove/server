import { createContext, useState } from "react";

const LoggedInUserContext = createContext({});

export const LoggedInProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <LoggedInUserContext.Provider value={{ user, setUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserContext;
