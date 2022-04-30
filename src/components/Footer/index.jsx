import React from "react";
import "./index.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerCreated">
                Created by <strong>Anna Sufianova</strong>
            </div>

            <div className="footerMail">
                contact me: <a href="mailto:anna.sufiianova@gmail.com">my email</a>
            </div>
        </div>
    )
}

export default Footer;