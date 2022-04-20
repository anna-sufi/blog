import React from "react";

const CreatePost = () => {
    return (
        <>
        <div className="createHeader">New Post</div>
        <form className="createForm">
            <label >Title</label>
            <textarea placeholder="Enter the post title"></textarea>
            <label rows="2">Text</label>
            <textarea rows="6" placeholder="Enter the text"></textarea>
            <label>Image</label>
            <input type="text" id="createImg" placeholder="Enter the Image URL"></input>
            <label >Tags</label>
            <input placeholder="Enter the tags"></input>
            <button>Public post</button>
       
        </form>
        </>

    )
}

export default CreatePost;