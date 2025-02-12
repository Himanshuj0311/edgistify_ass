import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main
        className="w-full lg:w-[95%] mx-0 lg:mx-auto my-5"
        style={{ minHeight: "calc(100vh - 110px)" }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
