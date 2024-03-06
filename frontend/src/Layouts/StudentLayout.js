import React from "react";
import Navbar from "../Components/Student/Navbar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default StudentLayout;
