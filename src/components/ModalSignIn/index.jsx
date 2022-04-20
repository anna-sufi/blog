import React, {useState, useEffect} from "react";
import "./index.css";
import {Routes, Route, Link} from "react-router-dom";
import api from "../../api";

const ModalSignIn = (props) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const signInHandler = () => {
    api.signIn(email, password).then(ans => {
        console.log(ans);
        props.setAuthorized(true);
        props.changeActive(!props.active);
        props.setUser(ans.data && ans.data.name);
    })}

    return (
        <div className={props.active ? "modal active" : "modal"}>
            <div className="modal__container">
                <Routes>
                    <Route path="/signin" element={
                        <>
                        <h2 className="signInTitle">Sign in</h2>
                        <input placeholder="email" onInput={e => setEmail(e.target.value)}></input>
                        <input placeholder="password" onInput={e => setPassword(e.target.value)}></input>
                        <button onClick={signInHandler}>Sign in</button>
                        <Link className="signUpLink" to="/signup" onClick={e => props.changeActive(!props.active)}>Sign up</Link>
                        </> }
                    />         
                </Routes>
                <div className="modal__close" onClick={e => props.changeActive(!props.active)}>X</div>
            </div>
        </div>
    )
}

export default ModalSignIn;