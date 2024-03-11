import { createContext, useState } from "react";

const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState();
  return (
    <CourseContext.Provider value={{ course, setCourse, }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;