import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import api from '../api';


const EditPost = (props) => {
    const params = useParams();
    const id = params.id;
    const [post, setPost] = useState({});

    useEffect(() => {
        api.getPost(id).then(ans => {
          setPost(ans);
          console.log(ans);
          },);}, [])

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
          
           {post.author && (post.author.email == props.email ? 
                            <div>you are the author</div> :
                            <div>Only the author can edit post</div> )}

      
       
        </>
    )
}

export default EditPost;