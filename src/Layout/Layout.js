import React from "react";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout-container">
      <Header/>
      <Outlet  />
      <Footer />
    </div>
  );
}

export default Layout;
