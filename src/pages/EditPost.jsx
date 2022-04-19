import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import api from '../api';


const EditPost = (props) => {
    const params = useParams();
    const id = params.id;
    const [post, setPost] = useState({});

    useEffect(() => {
        api.getPost(id).then(ans => {
          setPost(ans);
          console.log(ans);
          },);}, [])

    return (
        <>
        <div>EDITING</div>
        <div>{post.author && post.author.name}</div>
        </>
    )
}

export default EditPost;