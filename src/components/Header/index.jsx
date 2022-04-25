import React from "react";
import "./index.css";
// import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import SearchTitle from "../SearchTitle";



const Header = (props) => {

  const searchHandler = inpVal => {
    console.log("header", inpVal);
    props.appHandler(inpVal);}

  const clickHandler = (e) => {
    props.setModalActivity(!props.modalActivity);
  }

  const signOutHandler = (e) => {
    props.setAuthorized(!props.authorized);
    props.setUser("guest");
    props.setUserId("");
    props.setEmail("");
    document.getElementById('signIn_inp_email').value="";
    document.getElementById('signIn_inp_passw').value="";
  }

    return (
      <div className="header">
          <div className="headerLeft">
              <i className="fa-solid fa-pen-clip"></i>
              <Link to="/" className="title">POSTS BOARD </Link>
           </div>
           <SearchTitle searchText={props.searchText} searchHandler={searchHandler}/>
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