import React from "react";
import Navbar from "../Components/Digi/Navbar";
import { Outlet } from "react-router-dom";

const DigiLayout = () => {
  return (
    <>
      <nav><Navbar /></nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DigiLayout;
