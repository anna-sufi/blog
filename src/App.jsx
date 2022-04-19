import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import {Routes, Route} from "react-router-dom";
import api from "./api.jsx";


function App() {
	const [posts, setPosts] = useState([]);
    useEffect(() => {
	  api.getPosts().then(ans => {
		setPosts(ans);
		console.log(ans);
		},);}, [])
    
	return (
        <>
        <Header/>
        <main>
		 <Routes>
			 
			 <Route path="/" element={<Main posts={posts}/>}/>
			 <Route path="/edit/:id" element={<EditPost/>}/>
			 <Route path="/create" element={<CreatePost/>}/>
			 
			 
		 </Routes>
		</main>
        
</>
    )
}
 export default App;