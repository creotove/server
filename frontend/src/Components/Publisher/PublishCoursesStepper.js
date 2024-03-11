import React, { useEffect, useRef, useState } from "react";
import "./PublisherCourseStepper.css";
import useSteps from "../../hooks/useSteps";

const PublishCoursesStepper = () => {
  const stepRef = useRef([]);
  const {
    currentStep,
    setCurrentStep,
    stepsConfig,
    setIsComplete,
    isComplete,
  } = useSteps();
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev === stepsConfig.length) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1].Component;

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, idx) => (
          <div
            key={idx}
            ref={(el) => {
              stepRef.current[idx] = el;
            }}
            className={`step ${
              currentStep > idx + 1 || isComplete ? "complete" : ""
            } ${currentStep === idx + 1 ? "active" : ""}`}
          >
            <div className="step-number">
              {currentStep > idx + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                idx + 1
              )}
            </div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}
        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{
              width: `${calculateProgressBarWidth()}%`,
            }}
          ></div>
        </div>
      </div>
      <section className="flex flex-col">
        <ActiveComponent />
        <div className="flex justify-end">
          {!isComplete && (
            <button className="btn btn-primary" onClick={handleNext}>
              {currentStep === stepsConfig.length ? "Publish" : "Next"}
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default PublishCoursesStepper;
