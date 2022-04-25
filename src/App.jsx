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
	
	const [data, setData] = useState([]);
	const [posts, setPosts] = useState(data);
	const [user, setUser] = useState("guest");
	const [userId, setUserId] = useState("");
	const [modalActivity, setModalActivity] = useState(false);
	const [signUpActivity, setSignUpActivity] = useState(false);
    const [authorized, setAuthorized] = useState(false);
	const [email, setEmail] = useState("");	
	const[searchText,setSearch] = useState("");
	const [cnt, setSearchCnt] = useState(0);// количество карточек после поиска

	const appHandler = val => {
		console.log("app", val);
        setSearch(val);
		const newPosts = data.filter(el => el.title.toLowerCase().includes(val.toLowerCase()));
		setPosts(newPosts);
		setSearchCnt(newPosts.length);
	}

    useEffect(() => {
	  api.getPosts().then(ans => {
		setPosts(ans);
		setData(ans);
		console.log(ans);
	})}, [])
   
	return (
        <>
        <Header 
		modalActivity={modalActivity} setModalActivity={setModalActivity} 
		authorized={authorized} setAuthorized={setAuthorized}
		user={user} setUser={setUser} setUserId={setUserId}
		setEmail={setEmail}
		searchText={searchText} 
		appHandler={appHandler} />
		
		<main>
		 <Routes>			 
			 <Route path="/" 
			        element={<Main 
			                    authorized={authorized} 
								posts={posts}
								searchText={searchText} cnt={cnt} />}/>
			 <Route path="/edit/:id" element={<EditPost 
			                         authorized={authorized} userId={userId}
									 email={email} setPosts={setPosts}/>}/>
			 <Route path="/create" element={<CreatePost setPosts={setPosts}
			                                 setData={setData}/>}/>
		  </Routes>
		</main>

		<ModalSignIn
		   email={email} setEmail={setEmail} 
		   active={modalActivity} changeActive={setModalActivity} 
		   openSignUp={setSignUpActivity}
		   setAuthorized={setAuthorized} 
		   setUser={setUser} setUserId={setUserId}
		/>

        <ModalSignUp 
		   signUpActive={signUpActivity} 
		   changeSignUpActive={setSignUpActivity}
		/>
  
      </>
    )
}

 export default App;