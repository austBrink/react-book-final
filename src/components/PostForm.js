import React, { useState, useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import Quill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const PostForm = ({
  post:propsPost,
  addNewPost,
  updatePost 
}) => {

  // const { postSlug } = useParams();
  // const post = posts?.find(
  //   (post) => post.slug === postSlug
  // );
  // post && console.log(post);

  const [ post, setPost ] = useState({
    ...propsPost
  })
  const [ postData, setPostData ] = useState({
    title: '',
    content: '',
  });
  const [ saved, setSaved ] = useState(false);

  const prevPostRef = useRef();
  useEffect(() => {
    prevPostRef.current = post;
  },[]);
  const prevPost = prevPostRef.current;

  const quillRef = useRef();
  useEffect(() => {
    if(prevPost && quillRef.current) {
      if(propsPost.id !== prevPost.id) {
        setPost({...propsPost});
        quillRef.current.getEditor().setContents(``);
      }
    }
  }, [prevPost, propsPost]);

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

    if (updatePost) {
      addNewPost(post);
      setSaved(true);``
      return;
    }
    updatePost(post);
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
              value = {post.title}
              onChange = {onChangeHandler}
            />
        </p>
        <p>
          <label htmlFor = 'form-content'>Content:</label>
        </p>
        <Quill
          ref = {quillRef}
          defaultValue = {post.content}
          onChange = {(content, delta, source, editor) => {
            setPost((ps) => {
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