import React from "react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div className="w-full md:w-[720px] container px-2 pt-2 md:px-0 md:pt-5">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
