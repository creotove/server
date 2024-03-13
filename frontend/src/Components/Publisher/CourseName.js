import { useState } from "react";
import useCourse from "../../hooks/useCourse";
import useSteps from "../../hooks/useSteps";
const CourseName = () => {
  const { course, setCourse } = useCourse();
  const { setCurrentStep } = useSteps();
  const [name, setName] = useState("");
  return (
    <div className="flex  justify-center mt-5">
      <div className="flex flex-col items-center bg-white p-10 text-black rounded-lg">
        <label>Name of the course</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setCourse({ ...course, name: e.target.value });
          }}
          className="border rounded ps-1 py-1"
        />
        <button
          className="btn btn-primary mt-7"
          onClick={() => {
            if (name.trim() === "") return;
            setCurrentStep(2);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseName;
