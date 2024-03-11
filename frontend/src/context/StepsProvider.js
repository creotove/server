import { createContext, useState } from "react";
import AddSections from "../Components/Publisher/AddSections";
import CourseName from "../Components/Publisher/CourseName";
import Overview from "../Components/Publisher/Overview";

const StepsContext = createContext({});

export const StepsProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const stepsConfig = [
    {
      id: 1,
      name: "Name of the course",
      Component: () => <CourseName />,
    },
    {
      id: 2,
      name: "Add sections",
      Component: () => <AddSections />,
    },
    {
      id: 3,
      name: "Publish",
      Component: () => <Overview />,
    },
  ];
  return (
    <StepsContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        complete,
        setComplete,
        stepsConfig,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

export default StepsContext;
