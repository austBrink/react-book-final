import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const PostForm = (props) => {

  // decided on one object for form values....
  const [ postData, setPostData ] = useState({
    title: '',
    content: '',
  });

  // ...that way I could be general with this reusable function...AND onChange would avoid having an anonymous function. 
  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setPostData((prevState) => {
      return {...prevState, [name]:value}
    });
  }

    return (
      <form className="container">
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
          onChange = {(content, delta, source, editor) => {
            setPostData((pd) => {
              return {...pd, content: editor.getContents()}
            })
          }} 
        />
        <p>
          <button 
            type="submit"
            onClick = {(e) => {e.preventDefault(); console.log(postData.content.ops[0].insert);}}
          >Save</button>
        </p>
      </form>
    );
  }
  
  export default PostForm;