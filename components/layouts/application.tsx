import Socials from "components/socials";
import React, { useEffect } from "react";
import Footer from "./footer";
import Navigation from "./navigation";

const Application: React.FC = ({ children }) => {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  });
  return (
    <React.Fragment>
      <Navigation />
      {children}
      <Socials />
      <Footer />
    </React.Fragment>
  );
};

export default Application;
