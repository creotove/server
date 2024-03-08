import React from "react";
import Navbar from "../Components/Publisher/Navbar";
import { Outlet } from "react-router-dom";

const PublisherLayout = () => {
  return (
    <main className="d-flex">
      <nav>
        <Navbar />
      </nav>
      <section className="w-100 bg-tertiary bg-dark text-white p-5 ">
        <Outlet />
      </section>
    </main>
  );
};

export default PublisherLayout;
