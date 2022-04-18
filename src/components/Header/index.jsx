import React from "react";
import "./index.css";
import { faPen } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
    return (
      <div className="header">
         <i className="fa-solid fa-pen-clip"></i>
         <span className="title">... BLOG POSTS </span>
      </div>
    )
}
export default Header;