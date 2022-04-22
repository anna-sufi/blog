import React from "react";
import "./index.css";
// import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";


const Header = (props) => {
  // const location = useLocation();
  // props.setFrom(location.pathname);

  const clickHandler = (e) => {
    props.setModalActivity(!props.modalActivity);
  }

  const signOutHandler = (e) => {
    props.setAuthorized(!props.authorized);
    props.setUser("guest");
    props.setEmail("");

  }

    return (
      <div className="header">
          <div className="headerLeft">
              <i className="fa-solid fa-pen-clip"></i>
              <Link to="/" className="title">POSTS BOARD </Link>
           </div>
           <div className="headerRight"> <span>Hello,</span>
              <span className="headerUser">{props.user}</span><span>! </span>
              
              {props.authorized ? 
              <span className="signOut" onClick={signOutHandler}>Sign out</span> 
              : <span className="signInLink" onClick={clickHandler}>Sign in</span>
            }
           </div>
      </div>
    )
}
export default Header;