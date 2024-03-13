import React, { useState } from "react";
import Navbar from "../Components/Publisher/Navbar";
import { Outlet } from "react-router-dom";

const PublisherLayout = () => {
  const [close, setClose] = useState();
  return (
    <main className="d-flex">
      <nav>
        <Navbar close={close} />
      </nav>
      <section className="w-100 h-screen overflow-auto bg-tertiary bg-dark text-white p-5 ">
        <button className="btn btn-danger" onClick={()=>setClose(!close)}>
          Toggle
        </button>
        <Outlet />
      </section>
    </main>
  );
};

export default PublisherLayout;
