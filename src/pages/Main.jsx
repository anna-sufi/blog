import React from "react";
import Blog from "../components/Blog";

const Page = (props) => {
    return (
        <>
        <div className="pageTitle">{props.name}</div>
        <div className="wellcome">
            <div className="greeting">Wellcome here!</div>
            <div className="btn-create">Create post</div>
            </div>
        <div className="container" >
        {props.posts.map(el => <Blog {...el} key={el._id}/>)}
        </div>

</>
    )
}

export default Page;