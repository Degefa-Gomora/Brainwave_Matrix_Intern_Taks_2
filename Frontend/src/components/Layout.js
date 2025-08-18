// src/components/Layout.js
import React from "react";
import Header from "./Header"; // Your existing Header component
import Footer from "./Footer"; // Your new Footer component

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
