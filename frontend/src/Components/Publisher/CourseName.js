import { useState } from "react";
import useCourse from "../../hooks/useCourse";
const CourseName = () => {
  const { course, setCourse } = useCourse();
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
      </div>
    </div>
  );
};

export default CourseName;
