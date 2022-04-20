import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import {Routes, Route} from "react-router-dom";
import api from "./api.jsx";
import ModalSignIn from "./components/ModalSignIn";
import SignUp from "./pages/SignUp";

function App() {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState("guest");
	const [modalActivity, setModalActivity] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
	  api.getPosts().then(ans => {
		setPosts(ans);
		console.log(ans);
	},);}, [])

	
    
	return (
        <>
        <Header 
		modalActivity={modalActivity} 
		setModalActivity={setModalActivity} 
		authorized={authorized}
		setAuthorized={setAuthorized}
		user={user}/>
        
		<main>
		 <Routes>			 
			 <Route path="/" element={<Main posts={posts}/>}/>
			 <Route path="/edit/:id" element={<EditPost/>}/>
			 <Route path="/create" element={<CreatePost/>}/>
			 <Route path="/signup" element={<SignUp/>}/>			 
		 </Routes>
		</main>
		<ModalSignIn active={modalActivity} setAuthorized={setAuthorized} changeActive={setModalActivity} setUser={setUser}/>

        
</>
    )
}
 export default App;