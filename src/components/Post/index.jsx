import React from "react";
import "./index.css";
import { Link } from "react-router-dom"; 
import shortid from "../../../node_modules/shortid";

const Post = (props) => {

    return (
            <div className="img_post">
                    <div className="post_content">
                            <div className="postHeader">
                                  <div className="postTitle">{props.title && (props.title.length > 23 ? (props.title.slice(0, 21) + '...') : props.title)}</div>
                                  <Link className="linkEdit" to={`/edit/${props._id}`} ><div > more/edit</div></Link>
                           </div>
                          <div className="postAuthor">
                                   <img className="authorPhoto" src={props.author && props.author.avatar} alt="avatar" />
                                   <div>{props.author && props.author.name}</div>
                          </div>
                          <div className="postText">
                                   <img className="postPhoto" src={props.image && props.image} alt="photo" />
                                   <div className="text">{props.text && (props.text.length > 100 ? (props.text.slice(0, 98) + '...') : props.text)}</div>
                          </div>
                          <div className="tags">
                               {props.tags && props.tags.join().length > 28 ? 
                                   (props.tags.join().slice(0, 25).concat('...').split(',').map(el => <span className="createTag" key={shortid.generate()}> <i>{el}</i></span>))
                                  :
                                 props.tags.map(el => <span className="createTag" key={shortid.generate()}> <i>{el}</i></span>)}
                          </div>
                          <div className="datesLikes">         
                              <span className="edited">updated  {props.updated_at && props.updated_at.slice(0, 10)}</span>
                              <div className="commentsLikes">
                                  <span><i className="fa-solid fa-heart post"> </i> {props.likes.length} </span>
                                  <span><i className="fa-solid fa-comment"> </i> {props.comments.length} </span>
                              </div>
                          </div>
              
                       </div>
           </div>
        )
}
export default Post;