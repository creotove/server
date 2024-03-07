import { useContext } from "react";
import LoggedInUserContext  from "../context/LoggedInUserProvider";

const useLoggedIn = () => {
  return useContext(LoggedInUserContext);
};

export default useLoggedIn;