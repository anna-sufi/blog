import React from "react";
import "./index.css";
import { Link } from "react-router-dom"; 

const Post = (props) => {

    return (
            <div className="img_post">
                    <div className="post_content">
                            <div className="postHeader">
                                  <div className="postTitle">{props.title && props.title.slice(0, 30)}...</div>
                                  <Link className="linkEdit" to={`/edit/${props._id}`} ><div >read more/edit</div></Link>
                           </div>
                          <div className="postAuthor">
                                   <img className="authorPhoto" src={props.author && props.author.avatar} alt="avatar" />
                                   <div>{props.author && props.author.name}</div>
                          </div>
                          <div className="postText">
                                   <img className="postPhoto" src={props.image && props.image} alt="photo" />
                                   <div className="text">{props.text && props.text.slice(0, 100)}...</div>
                          </div>

                          <div className="tags">
                                  <span><i>Tags: </i></span>
                                  {props.tags && props.tags.map(el => <span><i>{el}  </i></span>)}
                          </div>

                          <div className="dates">
                                   
                                   <div className="created">created...... {props.created_at && props.created_at.slice(0, 10)}</div>
                                   <div className="edited">updated.... {props.created_at && props.created_at.slice(0, 10)}</div>
                          </div>
                          
                          
                                       
                       </div>
           </div>
        )
}
export default Post;