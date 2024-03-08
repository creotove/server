import React from "react";
import SideBar from "../Components/Builder/SideBar";
import { Outlet } from "react-router-dom";

const BuilderLayout = () => {
  return (
     <main className="d-flex">
      <nav style={{width:'5rem',minWidth:'10rem'}}>
        <SideBar />
      </nav>
      <section className="w-100 bg-dark text-white p-5 ">
        <Outlet />
      </section>
    </main>
  );
};

export default BuilderLayout;
