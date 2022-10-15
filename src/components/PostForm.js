import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Quill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const PostForm = ({ addNewPost, posts }) => {

  const { postSlug } = useParams();
  const post = posts.find(
    (post) => post.slug === postSlug
  );
  
  const [ postData, setPostData ] = useState({
    title: '',
    content: '',
  });
  
  const [ saved, setSaved ] = useState(false);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setPostData((prevState) => {
      return {...prevState, [name]:value}
    });
  };

  const handleNewPost = (e) => {
    e.preventDefault();
    if(!postData.title){
      alert('Title is missing :(');
      return;
    }
    const post = {
      title: postData.title,
      content: postData.content,
    };
    addNewPost(post);
    setSaved(true);
  }

  if (saved) {
      return <Navigate to = '/' />;
  } else {
    return (
      <form className="container"
        onSubmit = {handleNewPost}>
        <h1>Add a New Post</h1>
        <p>
            <label htmlFor='form-title'>Title:</label>
            <br />
            <input
              id = 'form-tile'
              name = 'title'
              value = {postData.title}
              onChange = {onChangeHandler}
            />
        </p>
        <p>
          <label htmlFor = 'form-content'>Content:</label>
        </p>
        <Quill
          onChange = {(content, delta, source,editor) => {
            setPostData((ps) => {
              return {...ps, content: editor.getContents()}
            })
          }} 
        />
        <p>
          <button 
            type="submit"
            //onClick = {(e) => {e.preventDefault();console.log(postData.content.ops[0]insert);}}
            //onClick={handleNewPost}
          >Save</button>
        </p>
      </form>
    );
  }
}
  
export default PostForm;