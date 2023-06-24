import React, { Fragment } from "react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <ToastContainer />

      <div className="min-h-screen flex flex-col justify-between ">
        <div className="w-full md:w-[720px] container px-2 pt-2 md:px-0 md:pt-5">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
