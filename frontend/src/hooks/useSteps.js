import { useContext } from "react";
import StepsContext from "../context/StepsProvider";

const useSteps = () => {
  return useContext(StepsContext);
};

export default useSteps;