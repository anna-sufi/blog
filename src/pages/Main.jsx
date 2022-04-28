import React from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";

import usePagination from "../hooks/usePagination.jsx";
import SearchAnswer from "../components/SearchAnswer";

const Page = (props) => {
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
      } = usePagination({
        contentPerPage: 12,
        count: props.posts.length,
      });

    return (
        <div className="wrapper">
       
        <div className="wellcome">
            <div className="greeting">Wellcome here!</div>
            {props.authorized ?  <Link to="/create"><button className="btn-create">Create post</button></Link> :
           <span className="infoToCreate">Sign in to create new post</span>}
        </div>

        <SearchAnswer searchText={props.searchText} cnt={props.cnt}/>

        <div className="pagination">
           <p className="pagin_text">
             page {page}/{totalPages}
            </p>
            <div className="pag_buttons">
            <button onClick={prevPage} className="page">
            &larr;
            </button>
 
            {[...Array(totalPages).keys()].map((el) => (
           
               <button
                    onClick={() => setPage(el + 1)}
                    key={el}
                    className={`page ${page === el + 1 ? "pag_active" : ""}`}
                >{el + 1}</button>
            ))}
            <button onClick={nextPage} className="page">&rarr;</button>
            </div>
       </div>

        <div className="container" >
        {props.posts.slice(firstContentIndex, lastContentIndex).map(el => <Post {...el} key={el._id}/>)}
        </div>

       

</div>
    )
}

export default Page;