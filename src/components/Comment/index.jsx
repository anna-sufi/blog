import React from "react";
import api from "../../api";
import "./index.css";

const Comment = (props) => {
    return (

        <div className="comment">
                        <div className="commentAuthor">
                             <img className="commentAvatar" src={props.author && props.author.avatar}/>
                             <div className="commentAuthorInfo">
                                 <div className="commentAuthorName">{props.author && props.author.name}</div>
                                 <div className="commentAuthorAbout"><i>{props.author && props.author.about}</i></div>
                              </div>

                              {
                                  (props.author && (props.author._id == props.userId)) ?
                                  <div className="deleteComment" onClick={() => {
                                      api.delComment(props.author && props.post, props.author && props._id).then(
                                          ans => {console.log(ans);      
                                                //   props.setSendMode(!props.sendMode)
                                                }
                                      )

                                  }}>X</div>
                                  : <div></div>
                              }
                              

                       </div>

                       <div className="commentText">
                       {props.author && props.text}
                       </div>

                       <div className="commentUpdated"><i>updated {props.author && props.updated_at.slice(0, 10)}</i></div>

                     </div>


    )
}

export default Comment;