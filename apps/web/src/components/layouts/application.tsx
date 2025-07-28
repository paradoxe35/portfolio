import Socials from "@/components/socials";
import React, { PropsWithChildren, useEffect } from "react";
import Footer from "./footer";
import Navigation from "./navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const Application = ({ children }: PropsWithChildren<{}>) => {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  });
  return (
    <React.Fragment>
      <Navigation />
      {children}
      <Socials />
      <Footer />
      {/* <ThemeToggle /> */}
    </React.Fragment>
  );
};

export default Application;
