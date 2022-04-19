import React from "react";
import "./index.css";

const Post = (props) => {

    return (
            <div className="img_blog">
                    <div className="blog_content">
                          <div>{props.title && props.title}</div>
                          <div>{props.created_at && props.created_at.slice(0, 10)}</div>
                          <div>{props.author && props.author.name}</div>
                         
              
                       </div>
           </div>
        )
}
export default Post;