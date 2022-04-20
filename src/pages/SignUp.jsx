import React from "react";

const SignUp = (props) => {
    return (
<>
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
</>
    )
}
export default SignUp;

