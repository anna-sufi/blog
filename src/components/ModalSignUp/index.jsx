import React from "react";
import "./index.css";

const ModalSignUp = (props) => {
    return (
      <div className={props.signUpActive ? "signUp_modal signUp_active" : "signUp_modal"}>
            <div className="signUp_modal__container">
               <div className="signUpTitle">Sign up</div>
                <form className="signUpForm">
                    <label>Name: </label>
                    <input placeholder="Enter your full name"></input>
                    <label>About: </label>
                    <input placeholder="About you in one word"></input>  
                    <label>Email: </label>
                    <input placeholder="Enter your email"></input>
                    <label>Password: </label>
                    <input placeholder="Create password"></input>
                    <button>Sign up</button>
               </form>
               <div className="signUp_modal__close" onClick={e => props.changeSignUpActive(!props.signUpActive)}>X</div>
           </div>
       </div>
    )
}
export default ModalSignUp;

