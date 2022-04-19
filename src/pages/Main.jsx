import React from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const Page = (props) => {
    return (
        <>
       
        <div className="wellcome">
            <div className="greeting">Wellcome here!</div>
            <Link to="/create"><button className="btn-create">Create post</button></Link>
            </div>
        <div className="container" >
        {props.posts.map(el => <Post {...el} key={el._id}/>)}
        </div>

</>
    )
}

export default Page;