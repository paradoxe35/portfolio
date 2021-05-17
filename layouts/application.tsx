import Socials from "components/socials"
import React from "react"
import Footer from "./footer"
import Navigation from "./navigation"


const Application: React.FC = ({ children }) => {
    return <React.Fragment>
        <Navigation />
        {children}
        <Socials />
        <Footer />
    </React.Fragment>
}


export default Application