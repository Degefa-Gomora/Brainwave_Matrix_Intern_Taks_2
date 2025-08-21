// src/components/Layout.js
import React from "react";
import Header from "./Header"; 
import Footer from "./Footer"; 
import ImageBanner from "./GeneralScreens/ImageBanner"; 
import "../../Css/Layout.css"; 


const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <ImageBanner />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
