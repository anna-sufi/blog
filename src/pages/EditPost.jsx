import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {useNavigate } from "react-router-dom";
import api from '../api';


const EditPost = (props) => {
    const params = useParams();
    const id = params.id;
    const [post, setPost] = useState({});
    // const [liked, setLiked] = useState(false);
    const [youLiked, setYouLiked] = useState(false);
    const navigate = useNavigate();

    const putLike = () => {
        if (props.authorized == true) {
            // setLiked(true);
            setYouLiked(true);
            api.offLike(post._id).then(
                api.getPost(id).then(ans => {
                    setPost(ans);
                })
            )
            api.putLike(post._id);
        }}

    const offLike = () => {
        if (props.authorized == true) {
            // setLiked(false);
            setYouLiked(false);
            api.offLike(post._id).then(
                api.getPost(id).then(ans => {
                    setPost(ans);
                    
                })
            )
        }
    }

    const deletePost = () => {
       prompt("Are you sure you want to DELETE this post? This action is irreversable." + post._id);
        api.delPost(post._id).then(ans => {
              console.log(ans);
               alert("Post is deleted.");
               api.getPosts().then(ans => {
                props.setPosts(ans);})
             });
        navigate("/");
    }

    useEffect(() => {
        api.getPost(id).then(ans => {
          setPost(ans);
          console.log(ans);
          let likesArray = ans.likes;
          for (let el of likesArray) {
              if (el == props.userId) {
                  setYouLiked(true); 
                //   setLiked(true);
                  break;} else {setYouLiked(false)}
            }
    })}, [])

    return (
       <>
       <div className="editForm">

           <div className="editAuthor">
               <img className="editAvatar" src={post.author && post.author.avatar}/>
               <div className="editAuthorInfo">
                   <div className="editAuthorName">{post.author && post.author.name}</div>
                   <div className="editAuthorAbout"><i>{post.author && post.author.about}</i></div>
               </div>
           </div>

           <div className="editTitle">"{post.author && post.title}"</div>
           <img className="editImage" src={post.author && post.image}/>
           <textarea rows="6" className="editText" disabled value={post.author && post.text}/>
           <div className="editTags"><span>Tags: </span>"{post.author && post.tags.join(', ')}"</div>
           <div className="editLastedit"><span>Last edit on: </span>"{post.author && post.updated_at.slice(0, 10)}"</div>
      </div> 
          
           {post.author && (post.author.email == props.email) ? 
                <div className="editButtons">
                    <button className="editBtn-edit">Edit</button>
                    <button className="editBtn-edit">Save</button>
                    <button className="editBtn-edit" onClick={deletePost}>Delete post</button>
                </div> : 
                    <div className="editBan">Only the author can edit post
                      {props.authorized ? <span></span> : <span className="editLikeBan">Sign in to like and comment.</span>}
                  </div> 
            }

                 <div className="editLike">
                      {youLiked ? <i class="fa-solid fa-heart" onClick={offLike}></i> : <i class="fa-regular fa-heart" onClick={putLike}></i>}
                      <span> {post.likes && post.likes.length} </span><span>people {youLiked ? "(and you)" : ""} like this post</span>
                 </div>
      
       
        </>
    )
}

export default EditPost;