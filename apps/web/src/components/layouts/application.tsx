"use client";

import Socials from "@/components/socials";
import React, { PropsWithChildren, useEffect } from "react";
import Footer from "./footer";
import Navigation from "./navigation";

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
    </React.Fragment>
  );
};

export default Application;
