import React from "react";
import "./index.css";
import { useNavigate } from "react-router";


const Modal_DeletePost = (props) => {
  const navigate = useNavigate();
   const confirm_delete_Handle = (e) => {
       e.preventDefault();
       props.setDelModalActivity(false);
       navigate("/");
   }

    return (
      <div className={props.del_modalActivity ? "del_modal del_active" : "del_modal"}>
            <div className="del_modal__container">
               <div className="signUpTitle">The post is deleted</div>
               <button className="modalBtnOk" onClick={confirm_delete_Handle}>OK</button>
               <div className="del_modal__close" onClick={e => props.setDelModalActivity(false)}>X</div>
           </div>
       </div>
    )
}
export default Modal_DeletePost;

