import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

/* Components such as Navbar and Footer can be placed here */

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
