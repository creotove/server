import React from "react";
import Navbar from "../Components/Academy/Navbar";
import { Outlet } from "react-router-dom";

const AcademyLayout = () => {
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

export default AcademyLayout;
