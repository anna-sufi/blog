import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import {Routes, Route} from "react-router-dom";
import api from "./api.jsx";
import ModalSignIn from "./components/ModalSignIn";
import ModalSignUp from "./components/ModalSignUp";


function App() {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState("guest");
	const [modalActivity, setModalActivity] = useState(false);
	const [signUpActivity, setSignUpActivity] = useState(false);
    const [authorized, setAuthorized] = useState(false);
	const [email, setEmail] = useState("");	

    useEffect(() => {
	  api.getPosts().then(ans => {
		setPosts(ans);
		console.log(ans);
	},);}, [])
   
	return (
        <>
        <Header 
		modalActivity={modalActivity} setModalActivity={setModalActivity} 
		authorized={authorized} setAuthorized={setAuthorized}
		user={user} setUser={setUser}
		setEmail={setEmail}/>
		
		<main>
		 <Routes>			 
			 <Route path="/" 
			        element={<Main 
			                    authorized={authorized} 
								posts={posts}/>}
								/>
			 <Route path="/edit/:id" element={<EditPost email={email}/>}/>
			 <Route path="/create" element={<CreatePost />}/>
		  </Routes>
		</main>

		<ModalSignIn
		   email={email} setEmail={setEmail} 
		   active={modalActivity} changeActive={setModalActivity} 
		   openSignUp={setSignUpActivity}
		   setAuthorized={setAuthorized} 
		   setUser={setUser}
		/>

        <ModalSignUp 
		   signUpActive={signUpActivity} 
		   changeSignUpActive={setSignUpActivity}
		/>
  
      </>
    )
}

 export default App;