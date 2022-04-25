import React from 'react';
import "./index.css";

const SearchAnswer = ({searchText, cnt}) => {
    return (
        searchText && <div className="searchAnswer">
       found {cnt} posts to "<strong>{searchText}</strong>" request 
    </div>
    )
}

export default SearchAnswer;