import React, {useState} from "react";

import api from "../api";

const CreatePost = (props) => {

    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostText, setNewPostText] = useState("");
    const [newPostImage, setNewPostImage] = useState("");
    const [newPostTags, setNewPostTags] = useState([]);
   
    const sendPostHandler = (e) => {
        e.preventDefault();
        if (newPostTitle && newPostText && newPostImage) {
          api.sendPost(newPostTitle, newPostText, newPostImage, newPostTags).then(ans => {
             console.log(ans);
             props.setModifyPosts(!props.modifyPosts); 
            props.setCreateModalActivity(true);
           });
           props.setModifyPosts(!props.modifyPosts);
        } else {
            alert('Enter all data (tags are optional');
            
        }
    }

    return (
        <div className="wrapper">
        <div className="createHeader">New Post</div>
        <form className="createForm">
            <label >Title</label>
            <textarea onInput={e => setNewPostTitle(e.target.value)} placeholder="Enter the post title"></textarea>
            <label rows="2">Text</label>
            <textarea onInput={e => setNewPostText(e.target.value)} rows="6" placeholder="Enter the text"></textarea>
            <label>Image</label>
            <input type="text" id="createImg" onInput={e => setNewPostImage(e.target.value)} placeholder="Enter the Image URL"></input>
            <label >Tags</label>
            <input  onInput={e => setNewPostTags(e.target.value.split(',').map(el => el.trim()))} placeholder="Enter the tags, comma separated. (optional)"></input>
            <button onClick={sendPostHandler} >Public post</button>
       
        </form>
        </div>

    )
}

export default CreatePost;