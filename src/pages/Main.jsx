import React from "react";
import Post from "../components/Post";

const Page = (props) => {
    return (
        <>
        <div className="pageTitle">{props.name}</div>
        <div className="wellcome">
            <div className="greeting">Wellcome here!</div>
            <button className="btn-create">Create post</button>
            </div>
        <div className="container" >
        {props.posts.map(el => <Post {...el} key={el._id}/>)}
        </div>

</>
    )
}

export default Page;