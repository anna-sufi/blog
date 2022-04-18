import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import {Routes, Route} from "react-router-dom";
import api from "./api.jsx";
import Blog from "./components/Blog";

function App() {
	const [data, setData] = useState([]);
    useEffect(() => {
	  api.getPosts().then(ans => {
		setData(ans);
		console.log(ans);
		
		},);}, [])
    
		return (
        <>
        <Header/>
		
		
        <main>
		 <Routes>
			 
			 <Route path="/" element={<Main name="All posts"/>}/>
			 {/* <Route path="/product/:id" element={<Product name="Товар" />}/> */}
			 {/* <Route path="/profile" element={<Profile name="Личные данные"/>}/> */}
		 </Routes>
		</main>
       
        
</>
    )
}
 export default App;