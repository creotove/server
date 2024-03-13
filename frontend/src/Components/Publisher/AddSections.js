// import React, { useState } from "react";
// import useCourse from "../../hooks/useCourse";
// import useSteps from "../../hooks/useSteps";

// const AddSections = () => {
//   const { setCourse } = useCourse();
//   const { setCurrentStep, stepsConfig, setIsComplete } = useSteps();
//   const [sections, setSections] = useState([
//     {
//       id: "d65a117f-f342-4e80-96e1-91524f7eb7f8",
//       name: "Untitled Section 1",
//       chapters: [],
//     },
//   ]);

//   const addSection = () => {
//     const newSection = {
//       id: generateId(),
//       name: `Untitled Section ${sections.length + 1}`,
//       chapters: [],
//     };
//     setSections([...sections, newSection]);
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       sections: [
//         ...prevCourse.sections,
//         { name: newSection.name, chapters: [] },
//       ],
//     }));
//   };

//   const deleteSection = (sectionId) => {
//     const updatedSections = sections.filter((section) => section.id !== sectionId);
//     setSections(updatedSections);
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       sections: updatedSections.map((section) => ({
//         name: section.name,
//         chapters: section.chapters,
//       })),
//     }));
//   };

//   const updateSectionName = (sectionId, newName) => {
//     const updatedSections = sections.map((section) =>
//       section.id === sectionId ? { ...section, name: newName } : section
//     );
//     setSections(updatedSections);
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       sections: updatedSections.map((section) => ({
//         name: section.name,
//         chapters: section.chapters,
//       })),
//     }));
//   };

//   const addChapter = (sectionId) => {
//     const newChapter = { name: "New Chapter", files: [] }; // Adding files array to store uploaded files
//     const updatedSections = sections.map((section) =>
//       section.id === sectionId ? { ...section, chapters: [...section.chapters, newChapter] } : section
//     );
//     setSections(updatedSections);
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       sections: updatedSections.map((section) => ({
//         name: section.name,
//         chapters: section.chapters,
//       })),
//     }));
//   };

//   const deleteChapter = (sectionId, chapterIndex) => {
//     const updatedSections = sections.map((section) =>
//       section.id === sectionId
//         ? { ...section, chapters: section.chapters.filter((_, index) => index !== chapterIndex) }
//         : section
//     );
//     setSections(updatedSections);
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       sections: updatedSections.map((section) => ({
//         name: section.name,
//         chapters: section.chapters,
//       })),
//     }));
//   };

//   const updateChapterName = (sectionId, chapterIndex, newName) => {
//     const updatedSections = sections.map((section) =>
//       section.id === sectionId
//         ? {
//             ...section,
//             chapters: section.chapters.map((chapter, index) =>
//               index === chapterIndex ? { ...chapter, name: newName } : chapter
//             ),
//           }
//         : section
//     );
//     setSections(updatedSections);
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       sections: updatedSections.map((section) => ({
//         name: section.name,
//         chapters: section.chapters,
//       })),
//     }));
//   };

//   const handleNext = () => {
//     setCurrentStep((prev) => {
//       if (prev === stepsConfig.length) {
//         setIsComplete(true);
//         return prev;
//       } else {
//         return prev + 1;
//       }
//     });
//   };

//   const generateId = () => {
//     return Math.random().toString(36).substr(2, 9);
//   };

//   // Function to handle file upload for a chapter

//   const handleFileUpload = (sectionId, chapterIndex, files) => {
//     const updatedSections = sections.map((section) =>
//       section.id === sectionId
//         ? {
//             ...section,
//             chapters: section.chapters.map((chapter, index) =>
//               index === chapterIndex ? { ...chapter, files: [...files] } : chapter
//             ),
//           }
//         : section
//     );
//     setSections(updatedSections);
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       sections: updatedSections.map((section) => ({
//         name: section.name,
//         chapters: section.chapters,
//       })),
//     }));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Render sections */}
//         {sections.map((section) => (
//           <div key={section.id} className="col-12 ">
//             {/* Section card */}
//             <div className="card p-2 rounded-0 aqcard unit mb-3">
//               {/* Section header */}
//               <div className="card-header pt-0 pb-0">
//                 <div className="card-title mb-0 py-2">
//                   <h6 className="my-0 text-gray text-uppercase">Section</h6>
//                   <span className="bmd-form-group is-filled">
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control col-8 rounded-0 py-2 "
//                         maxLength="100"
//                         placeholder="Enter section name"
//                         value={section.name}
//                         onChange={(e) =>
//                           updateSectionName(section.id, e.target.value)
//                         }
//                       />
//                       {/* Add section collapse button */}
//                       <div
//                         className="input-group-append"
//                         style={{ marginLeft: "15px" }}
//                       ></div>
//                     </div>
//                   </span>
//                 </div>
//               </div>
//               {/* Section body */}
//               <div
//                 className="card-body active"
//                 id={`collapse-unit-${section.id}`}
//               >
//                 <div className="w-100 text-center">
//                   <div className="card-title mb-0">
//                     <h6 className="my-0 text-left text-gray text-uppercase">
//                       Chapters :
//                     </h6>
//                   </div>
//                 </div>
//                 {/* Render chapters */}
//                 <div className="">
//                   {section.chapters.map((chapter, index) => (
//                     <div key={index}>
//                       {/* Chapter input */}
//                       <input
//                         type="text"
//                         className="form-control rounded-0 py-2"
//                         value={chapter.name}
//                         onChange={(e) =>
//                           updateChapterName(section.id, index, e.target.value)
//                         }
//                       />
//                       {/* File upload for the chapter */}
//                       <input
//                         type="file"
//                         onChange={(e) =>
//                           handleFileUpload(section.id, index, e.target.files)
//                         }
//                       />
//                       {/* Delete chapter button */}
//                       <button
//                         className="btn btn-sm btn-danger "
//                         onClick={() => deleteChapter(section.id, index)}
//                       >
//                         <i className="material-icons">delete</i>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 {/* Add chapter button */}
//                 <div className="w-100 text-center">
//                   <button
//                     className="btn btn-success btn-sm add-ans s_addlecture"
//                     onClick={() => addChapter(section.id)}
//                   >
//                     Add Chapter
//                   </button>
//                 </div>
//               </div>
//               {/* Delete section button */}
//               <div
//                 className="position-absolute m-0"
//                 style={{ right: "5px", top: "35px" }}
//               >
//                 <button
//                   type="button"
//                   className="btn btn-danger btn-just-icon s_deleteunit"
//                   title="Delete Section"
//                   onClick={() => deleteSection(section.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* Add section button */}
//       <div className="w-100 mt-5">
//         <div className="">
//           <div className="">
//             <div className="row align-items-stretch">
//               <div className="col-md-12 text-center">
//                 <div className="w-100 text-center">
//                   <button
//                     className="btn btn-success btn-sm add-ans s_addunit"
//                     onClick={addSection}
//                   >
//                     Add Section
//                     <div className="ripple-container"></div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="row mt-3">
//               <div className="col-md-12 text-end">
//                 <button className="btn btn-primary" onClick={handleNext}>
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddSections;

import React, { useState } from "react";
import useCourse from "../../hooks/useCourse";
import useSteps from "../../hooks/useSteps";

const AddSections = () => {
  const { setCourse } = useCourse();
  const { setCurrentStep, stepsConfig, setIsComplete } = useSteps();
  const [sections, setSections] = useState([
    {
      id: "d65a117f-f342-4e80-96e1-91524f7eb7f8",
      name: "Untitled Section 1",
      chapters: [],
    },
  ]);

  const addSection = () => {
    const newSection = {
      id: generateId(),
      name: `Untitled Section ${sections.length + 1}`,
      chapters: [],
    };
    
    // Check if any section name is empty
    const isAnySectionNameEmpty = sections.some(section => section.name.trim() === '');
    if (isAnySectionNameEmpty) {
      // Handle validation error (e.g., show error message)
      return;
    }
  
    setSections([...sections, newSection]);
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: [
        ...prevCourse.sections,
        { name: newSection.name, chapters: [] },
      ],
    }));
  };
  

  const deleteSection = (sectionId) => {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionId
    );
    setSections(updatedSections);
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: updatedSections.map((section) => ({
        name: section.name,
        chapters: section.chapters,
      })),
    }));
  };

  const updateSectionName = (sectionId, newName) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, name: newName } : section
    );
    setSections(updatedSections);
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: updatedSections.map((section) => ({
        name: section.name,
        chapters: section.chapters,
      })),
    }));
  };

  const addChapter = (sectionId) => {
    const newChapter = { name: "", files: [] }; // Initializing name as empty string
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? { ...section, chapters: [...section.chapters, newChapter] }
        : section
    );
    setSections(updatedSections);
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: updatedSections.map((section) => ({
        name: section.name,
        chapters: section.chapters,
      })),
    }));
  };

  const deleteChapter = (sectionId, chapterIndex) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            chapters: section.chapters.filter(
              (_, index) => index !== chapterIndex
            ),
          }
        : section
    );
    setSections(updatedSections);
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: updatedSections.map((section) => ({
        name: section.name,
        chapters: section.chapters,
      })),
    }));
  };

  const updateChapterName = (sectionId, chapterIndex, newName) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            chapters: section.chapters.map((chapter, index) =>
              index === chapterIndex ? { ...chapter, name: newName } : chapter
            ),
          }
        : section
    );
    setSections(updatedSections);
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: updatedSections.map((section) => ({
        name: section.name,
        chapters: section.chapters,
      })),
    }));
  };

  const handleNext = () => {
    // Check if any section has empty chapter names or no files uploaded
    const hasEmptyChapterNames = sections.some((section) =>
      section.chapters.some((chapter) => chapter.name.trim() === '')
    );
    const hasNoFilesUploaded = sections.some((section) =>
      section.chapters.some((chapter) => chapter.files.length === 0)
    );
  
    if (hasEmptyChapterNames || hasNoFilesUploaded) {
      // Handle validation error (e.g., show error message)
      return;
    }
  
    setCurrentStep((prev) => {
      if (prev === stepsConfig.length) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const handleFileUpload = (sectionId, chapterIndex, files) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            chapters: section.chapters.map((chapter, index) =>
              index === chapterIndex
                ? { ...chapter, files: [...files] }
                : chapter
            ),
          }
        : section
    );
    setSections(updatedSections);
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: updatedSections.map((section) => ({
        name: section.name,
        chapters: section.chapters,
      })),
    }));
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Render sections */}
        {sections.map((section) => (
          <div key={section.id} className="col-12 ">
            {/* Section card */}
            <div className="card p-2 rounded-0 aqcard unit mb-3">
              {/* Section header */}
              <div className="card-header pt-0 pb-0">
                <div className="card-title mb-0 py-2">
                  <h6 className="my-0 text-gray text-uppercase">Section</h6>
                  <span className="bmd-form-group is-filled">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control col-8 rounded-0 py-2 "
                        maxLength="100"
                        placeholder="Enter section name"
                        value={section.name}
                        onChange={(e) =>
                          updateSectionName(section.id, e.target.value)
                        }
                      />
                      {/* Add section collapse button */}
                      <div
                        className="input-group-append"
                        style={{ marginLeft: "15px" }}
                      ></div>
                    </div>
                  </span>
                </div>
              </div>
              {/* Section body */}
              <div
                className="card-body active"
                id={`collapse-unit-${section.id}`}
              >
                <div className="w-100 text-center">
                  <div className="card-title mb-0">
                    <h6 className="my-0 text-left text-gray text-uppercase">
                      Chapters :
                    </h6>
                  </div>
                </div>
                {/* Render chapters */}
                <div className="">
                  {section.chapters.map((chapter, index) => (
                    <div key={index}>
                      {/* Chapter input */}
                      <input
                        type="text"
                        className="form-control rounded-0 py-2"
                        placeholder="Enter chapter name"
                        value={chapter.name}
                        onChange={(e) =>
                          updateChapterName(section.id, index, e.target.value)
                        }
                      />
                      {/* File upload for the chapter */}
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileUpload(section.id, index, e.target.files)
                        }
                      />
                      {/* Delete chapter button */}
                      <button
                        className="btn btn-sm btn-danger "
                        onClick={() => deleteChapter(section.id, index)}
                      >
                        <i className="material-icons">delete</i>
                      </button>
                    </div>
                  ))}
                </div>
                {/* Add chapter button */}
                <div className="w-100 text-center">
                  <button
                    className="btn btn-success btn-sm add-ans s_addlecture"
                    onClick={() => addChapter(section.id)}
                  >
                    Add Chapter
                  </button>
                </div>
              </div>
              {/* Delete section button */}
              <div
                className="position-absolute m-0"
                style={{ right: "5px", top: "35px" }}
              >
                <button
                  type="button"
                  className="btn btn-danger btn-just-icon s_deleteunit"
                  title="Delete Section"
                  onClick={() => deleteSection(section.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add section button */}
      <div className="w-100 mt-5">
        <div className="">
          <div className="">
            <div className="row align-items-stretch">
              <div className="col-md-12 text-center">
                <div className="w-100 text-center">
                  <button
                    className="btn btn-success btn-sm add-ans s_addunit"
                    onClick={addSection}
                  >
                    Add Section
                    <div className="ripple-container"></div>
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 text-end">
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSections;
