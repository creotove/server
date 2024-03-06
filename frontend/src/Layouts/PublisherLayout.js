import React from "react";
import Navbar from "../Components/Publisher/Navbar";
import { Outlet } from "react-router-dom";

const PublisherLayout = () => {
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

export default PublisherLayout;
