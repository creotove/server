import React from "react";
import Navbar from "../Components/Student/Navbar.js";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <section className=''>
      <nav>
        <Navbar />
      </nav>
      <main className="">
        <Outlet />
      </main>
    </section>
  );
};

export default StudentLayout;
