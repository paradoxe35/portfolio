import React from "react"
import Navigation from "./navigation"


const Application: React.FC = ({ children }) => {
    return <React.Fragment>
        <Navigation />
        {children}
    </React.Fragment>
}


export default Application