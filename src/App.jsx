import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import {Routes, Route} from "react-router-dom";
import api from "./api.jsx";
import ModalSignIn from "./components/ModalSignIn";
import ModalSignUp from "./components/ModalSignUp";
import Modal_DeletePost from "./components/Modal_DeletePost";
import ModalCreateInfo from "./components/ModalCreateInfo";
import Footer from "./components/Footer";


function App() {
	
	const [data, setData] = useState([]);
	const [posts, setPosts] = useState(data);
	const [user, setUser] = useState("guest");
	const [userId, setUserId] = useState("");
	const [modalActivity, setModalActivity] = useState(false);
	const [del_modalActivity, setDelModalActivity] = useState(false);
	const [createModalActivity, setCreateModalActivity] = useState(false);
	
	const [signUpActivity, setSignUpActivity] = useState(false);
	const [modifyPosts, setModifyPosts] = useState(false);
    const [authorized, setAuthorized] = useState(false);
	const [email, setEmail] = useState("");	
	const[searchText,setSearch] = useState("");
	const [cnt, setSearchCnt] = useState(0);// количество карточек после поиска
	localStorage.setItem("token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU1YTVmNTk0N2M3MjkyZDhjMjA0ZmEiLCJpYXQiOjE2NTA2OTAwNzcsImV4cCI6MTY4MjIyNjA3N30.457WDX1bH8a5JcpKXRglQjL-WH1akJoQWeuFRpFtbdw'); // инициализация токена в хранилище
	
	
	// console.log(localStorage.getItem("token"));

	const appHandler = val => {
		console.log("app", val);
        setSearch(val);
		// const newPosts = data.filter(el => el.title.toLowerCase().includes(searchText.toLowerCase()));
		// setPosts(newPosts);
		// setSearchCnt(newPosts.length);
	}

    useEffect(() => {
	api.getPosts().then(ans => {
		  ans.reverse();
	  	 setPosts(ans);//изменяемый массив постов
		 setData(ans);//неизменяемый массив постов
		//  console.log(searchText);
		 if (searchText) {
		 setPosts(data.filter(el => el.title.toLowerCase().includes(searchText.toLowerCase())));
		 setSearchCnt(posts.length);}
		 console.log(posts)
	})}, [searchText, modifyPosts, del_modalActivity])
   
	return (
        <>
        <Header 
		modalActivity={modalActivity} setModalActivity={setModalActivity} 
		authorized={authorized} setAuthorized={setAuthorized}
		user={user} setUser={setUser} setUserId={setUserId}
		setModifyPosts={setModifyPosts} modifyPosts={modifyPosts}
		setEmail={setEmail}
		searchText={searchText} 
		appHandler={appHandler} />
		
		<main>
		 <Routes>			 
			 <Route path="/" 
			        element={<Main 
			                    authorized={authorized} 
								posts={posts}
								searchText={searchText} cnt={cnt} 
								setModifyPosts={setModifyPosts} modifyPosts={modifyPosts}/>}/>
			 <Route path="/edit/:id" element={<EditPost 
			                         authorized={authorized} userId={userId}
									 email={email} 
									 searchText={searchText} setSearch={setSearch}
									 setModifyPosts={setModifyPosts} modifyPosts={modifyPosts}
									setDelModalActivity={setDelModalActivity}/>}
									/>
			 <Route path="/create" element={<CreatePost setPosts={setPosts}
			                                 searchText={searchText} setSearch={setSearch}
			                                 setData={setData} setModifyPosts={setModifyPosts}
											 modifyPosts={modifyPosts} 
											 setCreateModalActivity={setCreateModalActivity}/>}/>
			<Route path="/profile" element={<Profile setUser={setUser} 
			                                setPosts={setPosts} setData={setData}
											setModifyPosts={setModifyPosts} modifyPosts={modifyPosts}/>}/>
		  </Routes>
		</main>

		<ModalSignIn
		   email={email} setEmail={setEmail} 
		   active={modalActivity} changeActive={setModalActivity} 
		   openSignUp={setSignUpActivity}
		   setAuthorized={setAuthorized} 
		   setUser={setUser} setUserId={setUserId}
		//    token={token} setToken={setToken}
		/>

        <ModalSignUp 
		   signUpActive={signUpActivity} changeSignUpActive={setSignUpActivity}
		   setUser={setUser} setUserId={setUserId} setEmail={setEmail}
		   setAuthorized={setAuthorized}
		/>

        <Modal_DeletePost 
		  setDelModalActivity={setDelModalActivity}/>

		<ModalCreateInfo createModalActivity={createModalActivity} setCreateModalActivity={setCreateModalActivity}/>

		<Footer />

		
  
      </>
    )
}

 export default App;