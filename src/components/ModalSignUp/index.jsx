import React from "react";
import "./index.css";
import api from "../../api";

const ModalSignUp = (props) => {
   const signUpHandle = (e) => {
       e.preventDefault();
       let email = document.querySelector("#signupEmail_input").value;
       let password = document.querySelector("#signupPassword_input").value;
       let name = document.querySelector("#signupName_input").value;
       let about = document.querySelector("#signupAbout_input").value;

     if (email && password && name && about) {
         api.signUp(email, password).then(ans => {
              console.log(ans);
              api.signIn(email, password).then(ans => {
                 console.log(ans);
                 localStorage.setItem("token", ans.token);// обновление токена в хранилище
                 console.log(localStorage.getItem("token"));
                 props.setAuthorized(true);
                 props.setUserId(ans.data && ans.data._id);
                 props.setEmail(ans.data && ans.data.email);
                 api.saveProfileInfo(name, about).then(ans => {
                     console.log(ans);
                     props.setUser(ans && ans.name);
                    })
                })
           })
       
         .catch(err => {
          alert(`Cannot sign up because: ${err}`)})
          
     } else {alert(`Enter all data`)}
   }

    return (
      <div className={props.signUpActive ? "signUp_modal signUp_active" : "signUp_modal"}>
            <div className="signUp_modal__container">
               <div className="signUpTitle">Sign up</div>
                <form className="signUpForm">
                    <label>Name: </label>
                    <input id="signupName_input" placeholder="Enter your full name" required></input>
                    <label>About: </label>
                    <input id="signupAbout_input"placeholder="About you in one word"></input>  
                    <label>Email: </label>
                    <input type="email" id="signupEmail_input" placeholder="Enter your email" required></input>
                    <label>Password: </label>
                    <input id="signupPassword_input" placeholder="Create password" required></input>
                    <button type="submit" onClick={signUpHandle}>Sign up</button>
               </form>
               <div className="signUp_modal__close" onClick={e => props.changeSignUpActive(!props.signUpActive)}>X</div>
           </div>
       </div>
    )
}
export default ModalSignUp;

