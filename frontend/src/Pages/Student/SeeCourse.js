import React, { useEffect, useState } from "react";
import Accordion from "../../Components/Common/Accordian";
import axios from "../../api/axios";
import useLoggedIn from "../../hooks/useLoggedIn";
import { useParams } from "react-router-dom";

const SeeCourse = () => {
  const [accordions, setAccordion] = useState([]);
  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };
  const { user } = useLoggedIn();
  const [sections, setSections] = useState([]);
  const studentId = user?._id;
  const { courseId } = useParams();
  const getCourse = async () => {
    const res = await axios.get(
      `/student/see-purchased-courses/${courseId}/${studentId}`
    );
    if (res.data.success) {
      setSections(res.data.data);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);

  // useEffect(() => {
  //   const newAccordions =
  //     sections &&
  //     sections.map((item, i) => {
  //       return {
  //         key: i + 1,
  //         name: item.name,
  //         isOpen: false,
  //       };
  //     });
  //   setAccordion(newAccordions);
  // }, [sections]);
  return (
    <>
      <section>
        <div className="grid md:grid-cols-12 gap-4 text-white">
          <div className="md:col-span-7 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer md:min-h-screen radius"></div>
          <div className="md:col-span-5 radius w-full">
            {accordions &&
              accordions.length > 0 &&
              accordions.map((accordion, i) => (
                <Accordion
                  key={accordion.key}
                  index={i}
                  name={accordion.name}
                  isOpen={accordion.isOpen}
                  toggleAccordion={() => toggleAccordion(accordion.key)}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SeeCourse;
