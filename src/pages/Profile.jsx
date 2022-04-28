import React, {useState, useEffect} from "react";
import api from "../api";

const Profile = (props) => {
    const [profile, setProfile] = useState({});
    const [editingMode, setEditingMode] = useState(false);

    const editProfile = () => {
        document.querySelector(".profileBtn-save").removeAttribute("disabled");
        document.querySelector(".profileBtn-edit").setAttribute("disabled", "disabled");
        setEditingMode(true);
    }

    const saveProfile = () => {
        let newName = document.querySelector(".profileAuthorName").value;
        let newAbout = document.querySelector(".profileAuthorAbout").value;
        let newAvatar = document.querySelector(".profileUrlInp").value;
        // console.log(newName);
        // console.log(newAbout);
        // console.log(newAvatar);

        api.saveProfileInfo(newName, newAbout)
        .then(ans => {
            console.log(ans);
        });

        api.saveProfileAvatar(newAvatar)
           .then(ans => {
               console.log(ans);     
        });

        api.getProfile().then(ans => {
                console.log(ans);
                setProfile(ans);
                props.setUser(ans && ans.name);
                document.querySelector(".profileBtn-save").setAttribute("disabled", "disabled");
                document.querySelector(".profileBtn-edit").removeAttribute("disabled");
                setEditingMode(false);
            })

        api.getPosts().then(ans => {
                props.setPosts(ans);
                props.setData(ans);
        })
           
    }

    useEffect(() => {
        api.getProfile().then(ans => {
          console.log(ans);
          setProfile(ans);
          document.querySelector(".profileBtn-save").setAttribute("disabled", "disabled")
      })}, [])

    return (
        <div className="wrapper">
            <div className="profileForm">
                <div className="profileInfo">
                    <img className="profileAvatar" src={profile && profile.avatar}/>
                    <div className="profileText">
                       {editingMode ? <input className="profileAuthorName" defaultValue={profile && profile.name}></input>
                        : <div className="profileAuthorName">{profile && profile.name}</div>}
                        {editingMode ? <input className="profileAuthorAbout" defaultValue={profile && profile.about}></input>
                        : <div className="profileAuthorAbout"><i>{profile && profile.about}</i></div>}
                        <div className="profileAuthorEmail"><i>{profile && profile.email}</i></div>
                        {editingMode ? <input className="profileUrlInp" defaultValue={profile && profile.avatar}></input> : <span></span>}
                    </div>
               </div>

               <div className="profileButtons">
                   <button className="profileBtn-edit" onClick={editProfile}>Edit</button>
                   <button className="profileBtn-save"  onClick={saveProfile} >Save</button>                   
               </div>
           </div>
        </div>
    )
}

export default Profile;