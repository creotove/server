import { Route, Routes } from "react-router-dom";
import DigiLayout from "./Layouts/DigiLayout";
import DigiHome from "./Pages/Digi/Home";
import DigiAbout from "./Pages/Digi/About";
import DigiLogin from "./Pages/Digi/Login";
import DigiSignUp from "./Pages/Digi/SignUp";

import AcademyLayout from "./Layouts/AcademyLayout";
import AcademyHome from "./Pages/Academy/Home";
import AcademyAbout from "./Pages/Academy/About";
import AcademyCourses from "./Pages/Academy/Courses";
import AcademyLogin from "./Pages/Academy/Login";
import AcademySignUp from "./Pages/Academy/SignUp";

import PublisherLayout from "./Layouts/PublisherLayout";
import PublisherHome from "./Pages/Publisher/Home";
import PublisherAbout from "./Pages/Publisher/About";
import PublisherCourse from "./Pages/Publisher/Courses";
import PublisherLogin from "./Pages/Publisher/Login";
import PublisherSignUp from "./Pages/Publisher/SignUp";

import NotFound from "./Pages/Common/NotFound";
import UnAuthorized from "./Pages/Common/UnAuthorized";

import RequireAuth from "./Routes/RequireAuth";
import WatchCoursesAcademey from "./Pages/Academy/WatchCourses";
import WatchCoursesPublisher from "./Pages/Publisher/WatchCourses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DigiLayout />}>
        <Route path="/" element={<DigiHome />} />
        <Route path="/about" element={<DigiAbout />} />
        <Route path="/log-in" element={<DigiLogin />} />
        <Route path="/sign-up" element={<DigiSignUp />} />
      </Route>
      <Route path="/academy" element={<AcademyLayout />}>
        <Route path="" element={<AcademyHome />} />
        <Route path="courses" element={<AcademyCourses />} />
        <Route path="about" element={<AcademyAbout />} />
        <Route path="log-in" element={<AcademyLogin />} />
        <Route path="sign-up" element={<AcademySignUp />} />
        {/* Protected */}
        <Route element={<RequireAuth />}>
          <Route path="watchcourses" element={<WatchCoursesAcademey />} />
        </Route>
      </Route>
      <Route path="/publisher" element={<PublisherLayout />}>
        <Route path=":publisherId" element={<PublisherHome />} />
        <Route path=":publisherId/about" element={<PublisherAbout />} />
        <Route path=":publisherId/log-in" element={<PublisherLogin />} />
        <Route path=":publisherId/sign-up" element={<PublisherSignUp />} />
        {/* Protected */}
        <Route element={<RequireAuth />}>
          <Route path="watchcourses" element={<WatchCoursesPublisher />} />
          <Route path=":publisherId/courses" element={<PublisherCourse />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
    </Routes>
  );
}

export default App;
