import React from "react";
import "./index.css";
import { useNavigate } from "react-router";


const ModalCreateInfo = (props) => {
  const navigate = useNavigate();
   const confirm_create = (e) => {
       e.preventDefault();
       props.setCreateModalActivity(false);
       navigate("/");
   }

    return (
      <div className={props.createModalActivity ? "create_modal create_active" : "create_modal"}>
            <div className="create_modal__container">
               <div className="signUpTitle">The post is created</div>
               <button className="modalBtnOk" onClick={confirm_create}>OK</button>
              
           </div>
       </div>
    )
}
export default ModalCreateInfo;

