import React, {useState} from "react";
import './index.css';
import api from "../../api";

const ModalSignIn = (props) => {
    const [password, setPassword] = useState("");  

    const signInHandler = () => {
       api.signIn(props.email, password).then(ans => {
           console.log(ans);
           props.setAuthorized(true);
           props.changeActive(!props.active);
           props.setUser(ans.data && ans.data.name);
           props.setUserId(ans.data && ans.data._id);
        } )}

    const signUpHandler = () => {
        props.openSignUp(true);
        props.changeActive(false);
        document.getElementById('signIn_inp_email').value="";
        document.getElementById('signIn_inp_passw').value="";
    }

    return (
        <div className={props.active ? "modal active" : "modal"}>
            <div className="modal__container">
                    <h2 className="signInTitle">Sign in</h2>
                    <input id="signIn_inp_email" placeholder="email" onInput={e => props.setEmail(e.target.value)} ></input>
                    <input id="signIn_inp_passw" placeholder="password" onInput={e => setPassword(e.target.value)} ></input>
                    <button onClick={signInHandler}>Sign in</button>
                    <span className="signUpLink" onClick={signUpHandler}>Sign up</span>    
                <div className="modal__close" onClick={e => props.changeActive(!props.active)}>X</div>
            </div>
        </div>
    )}

export default ModalSignIn;