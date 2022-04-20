import React from "react";
import "./index.css";
// import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const Header = (props) => {

  const clickHandler = (e) => {
    props.setModalActivity(!props.modalActivity);
  }

  const signOutHandler = (e) => {
    props.setAuthorized(!props.authorized);
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
              : <Link className="signInLink" to="/signin" onClick={clickHandler}>Sign in</Link>
            }
              
           
           </div>
      </div>
    )
}
export default Header;