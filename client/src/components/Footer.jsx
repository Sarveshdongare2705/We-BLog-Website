import React from "react";
import Logo from "../img/logo.png"

const Footer = () =>{
    return(
        <footer>
            <img src={Logo} alt="" />
            <span>Created By <a href="tel:+919969148611">Sarvesh Dongare</a></span>
        </footer>
    )
}

export default Footer