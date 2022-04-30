import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {useNavigate } from "react-router-dom";
import api from '../api';
import Comment from '../components/Comment';
import shortid from "../../node_modules/shortid";


const EditPost = (props) => {
    const params = useParams();
    const id = params.id; 
    const [post, setPost] = useState({}); // пост
    const [comments, setComments] = useState([]);// массив с комментами
    const [youLiked, setYouLiked] = useState(false); //наличие моего лайка
    const [editMode, setEditMode] = useState(false); // активация кнопок правки
    const [edited, setEdited] = useState(false); //слушатель изменений в этом посте 
    const [canSave, setCanSave] = useState(false); // активация кнопки 'Save'
    const [commentingMode, setCommentingMode] = useState();//открытие/закрытие окна комментирования
    const [sendMode, setSendMode] = useState(false);//слушатель публикации/удаления коммента 
    const navigate = useNavigate();


    //опубликовать коментарий (на кнопку 'Public')
    const sendNewComment = () => {
        let newComment = document.querySelector('#newComment').value;
        api.sendComment(id, newComment).then(ans => 
            {console.log(ans);   
              setSendMode(!sendMode);// обновить комменты под постом (useEffect getPostComments)
              setCommentingMode(false);//закрыть окно комментирования 
              props.setModifyPosts(!props.modifyPosts)// обновить посты на main (useEffect getPosts)
             } )}
    
    //поставить Лайк (клик на сердечко)
    const putLike = () => {
        if (props.authorized == true) {
            setYouLiked(true);
            api.putLike(id).then(ans => {
                console.log(ans);
                setEdited(!edited); //обновить этот пост (useEffect getPost)            
                props.setModifyPosts(!props.modifyPosts)} // обновить посты на main (useEffect getPosts)            
          )}}

    //убрать Лайк (клик на сердечко)
    const offLike = () => {
        if (props.authorized == true) {
            setYouLiked(false);
            api.offLike(id).then(ans => {
                console.log(ans);
                setEdited(!edited); //обновить этот пост (useEffect getPost)
                props.setModifyPosts(!props.modifyPosts)} // обновить посты на main (useEffect getPosts)          
          )}}

    //удалить пост (на кнопку 'delete') 
    const deletePost = () => {
       let answer = window.confirm("Are you sure you want to DELETE this post? This action could not be cancelled.");
        if (answer) {api.delPost(post._id).then(ans => {
              console.log(ans);
            //   alert("Post is deleted.");
              props.setModifyPosts(!props.modifyPosts); 
             props.setDelModalActivity(true);
             });
             props.setModifyPosts(!props.modifyPosts); // обновить посты на main (useEffect getPosts)  
            //  document.querySelector(".edit_wrapper").setAttribute("visibility", "hidden");
        // navigate("/"); 
        
    }
    }

    //автор включает режим правки поста (на кнопку "Edit")
    const editPost = () => {
        setCanSave(true); //активация кнопки 'Save'
        document.querySelector(".editBtn-edit").disabled=true;//выключаем кнопку "Edit"
        setEditMode(true);//активация режима правки поста
    }

    //сохранить изменения в  посте (на кнопку "Save")    
    const savePost = () => {
        let newTitle = document.querySelector(".editTitleInp").value;
        let newText = document.querySelector(".editTextInp").value;
        let newUrl = document.querySelector(".editUrlInp").value;
        let newTags = document.querySelector(".editTagsInp").value.split(',').map(el => el.trim());
        setCanSave(false); //выключаем кнопку "Save"
        document.querySelector(".editBtn-edit").disabled=false;//активация кнопки 'Edit'
        setEditMode(false);//выключаем режим правки поста
        api.savePost(id, newUrl, newTags, newTitle, newText).then(ans => {
            console.log(ans); 
            props.setModifyPosts(!props.modifyPosts);// обновить посты на main (useEffect getPosts)  
            setEdited(!edited); //обновить этот пост (useEffect getPost)   
        }); 
        // props.setModifyPosts(!props.modifyPosts);
    }

    useEffect(() => {
        // document.querySelector(".edit_wrapper").setAttribute("visibility", "visible");
        api.getPost(id).then(ans => {
          setPost(ans);
          let likesArray = ans.likes;
          for (let el of likesArray) {
              if (el == props.userId) {
                  setYouLiked(true); 
                  break;} else {setYouLiked(false)}
            }});
    }, [edited])


    //загрузка комментов к посту
    useEffect(() => {
        
        api.getPostComments(id).then(ans => {
        console.log(ans);
        setComments(ans)
        });
    }, [sendMode]) // слушает добавление и удаление

    return (
       <div className="wrapper edit_wrapper">
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
                     {comments.map(el => <Comment {...el} 
                                        key={el._id} userId={props.userId} 
                                        sendMode={sendMode} setSendMode={setSendMode}
                                        setModifyPosts={props.setModifyPosts}
                                        modifyPosts={props.modifyPosts}/>)}
                 </div>
        </div>
    )
}

export default EditPost;