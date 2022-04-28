import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {useNavigate } from "react-router-dom";
import api from '../api';
import Comment from '../components/Comment';
import shortid from "../../node_modules/shortid";

const EditPost = (props) => {
    const params = useParams();
    const id = params.id;
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [youLiked, setYouLiked] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [edited, setEdited] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [commentingMode, setCommentingMode] = useState();
    const [sendMode, setSendMode] = useState(false);
    const navigate = useNavigate();

    const sendNewComment = () => {
        let newComment = document.querySelector('#newComment').value;
        api.sendComment(id, newComment).then(ans => 
            console.log(ans)
            )
        setSendMode(!sendMode);
        setCommentingMode(false)
    }

    const putLike = () => {
        if (props.authorized == true) {
            setYouLiked(true);
            api.putLike(id).then(ans => {
                console.log(ans);
                setEdited(!edited);
                props.setModifyPosts(!props.modifyPosts)}             
          )}}

    const offLike = () => {
        if (props.authorized == true) {
            setYouLiked(false);
            api.offLike(id).then(ans => {
                console.log(ans);
                setEdited(!edited);
                props.setModifyPosts(!props.modifyPosts)}             
          )}}

    const deletePost = () => {
       let answer = window.confirm("Are you sure you want to DELETE this post? This action is irreversable.");
        if (answer) {api.delPost(post._id).then(ans => {
              console.log(ans);
               alert("Post is deleted.");
               props.setModifyPosts(!props.modifyPosts);   
             });
        navigate("/")}
    }

    const editPost = () => {
        setCanSave(true);
        document.querySelector(".editBtn-edit").disabled=true;
        setEditMode(true);
    }

    const savePost = () => {
        let newTitle = document.querySelector(".editTitleInp").value;
        let newText = document.querySelector(".editTextInp").value;
        let newUrl = document.querySelector(".editUrlInp").value;
        let newTags = document.querySelector(".editTagsInp").value.split(',').map(el => el.trim());
        setCanSave(false);
        document.querySelector(".editBtn-edit").disabled=false;
        setEditMode(false);
        api.savePost(id, newUrl, newTags, newTitle, newText)
        .then(ans => {
            console.log(ans); 
            console.log(props.modifyPosts);
            props.setModifyPosts(!props.modifyPosts);  
            console.log(props.modifyPosts);   
            setEdited(!edited);
            
        }); 
        // props.setModifyPosts(!props.modifyPosts); 
    }

    useEffect(() => {
        api.getPost(id).then(ans => {
          setPost(ans);
          let likesArray = ans.likes;
          for (let el of likesArray) {
              if (el == props.userId) {
                  setYouLiked(true); 
                  break;} else {setYouLiked(false)}
            }});
    }, [edited])

    useEffect(() => {
        api.getPostComments(id).then(ans => {
        console.log(ans);
        setComments(ans)
        });
    }, [sendMode])

    return (
       <div className="wrapper">
          <div className="editForm">

          <div className="editAuthor">
               <img className="editAvatar" src={post.author && post.author.avatar}/>
               <div className="editAuthorInfo">
                   <div className="editAuthorName">{post.author && post.author.name}</div>
                   <div className="editAuthorAbout"><i>{post.author && post.author.about}</i></div>
               </div>
           </div>
        
          { editMode ? <input className="editTitleInp" defaultValue={post.author && post.title}></input>: <div className="editTitle">"{post.author && post.title}"</div>}
           
           <div className="editImageWrapper">
           <img className="editImage" src={post.author && post.image}/>
           </div>

           { editMode ? <input className="editUrlInp" defaultValue={post.author && post.image}></input> : <span></span>}
           { editMode ? <textarea rows="6" className="editTextInp" defaultValue={post.author && post.text}></textarea> : <div className="editText">{post.author && post.text}</div> }
           { editMode ? <input className="editTagsInp" 
               defaultValue={post.author && post.tags.join(', ')}></input> 
               : <div className="editTags"><span>Tags: </span>{post.tags && post.tags.map(el => <span className="postTag" key={shortid.generate()}> <i>{el}</i></span>)}</div>}
              
           <div className="editLastedit"><span>Last edit on: </span>"{post.author && post.updated_at.slice(0, 10)}"</div>
       
        </div> 
          
           {post.author && (post.author._id == props.userId) ? 
                <div className="editButtons">
                    <button className="editBtn-edit" onClick={editPost}>Edit</button>
                    <button className="editBtn-save" disabled={!canSave} onClick={savePost} >Save</button>
                    <button className="editBtn-del" onClick={deletePost}>Delete post</button>
                </div> : 
                    <div className="editBan">Only the author can edit post
                      {props.authorized ? <span></span> : <span className="editLikeBan">Sign in to like and comment.</span>}
                    </div> 
            }
                 <div className="likesWrapper">
                      <div className="editLike">
                          {youLiked ? <i className="fa-solid fa-heart" onClick={offLike}></i> : <i className="fa-regular fa-heart" onClick={putLike}></i>}
                          <span> {post.likes && post.likes.length} </span><span>people like this post</span>
                      </div>

                       <div className="editComments">
                         {(props.authorized && !commentingMode) ? <button className="editAddCommentBtn" onClick={() => {setCommentingMode(true)}}>Write comment</button> : <span></span>}  
                       </div>
                 </div>

                 <div className="total_editComments">
                    <span>{comments && comments.length}</span><span> comments</span>
                 </div>

                 {commentingMode ? 
                 (
                     <div className="writeComment">
                         <textarea id="newComment" rows="6" placeholder="write your comment here"></textarea>
                         <button className="sendCommentBtn" onClick={sendNewComment}>Public</button>
                     </div>
                 )
                : <span>''</span>}

                 <div className="editComments">
                     {comments.map(el => <Comment {...el} key={el._id} userId={props.userId} sendMode={sendMode} setSendMode={setSendMode}/>)}

                 </div>

        </div>
    )
}

export default EditPost;