// dependencies
import React, { useState } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

// my stuff
import './App.css';
import Header from './components/Header.js';
import Posts from './components/Posts.js';
import Post from './components/Post.js';
import NotFound from './components/NotFound';
import PostForm from './components/PostForm';
import Message from './components/Message';
import { dummyData } from './utils.js';

const App = () => {

  const [ posts, setPosts ] = useState(dummyData);
  const [ message, setMessage ] = useState(null);

  const addNewPost = (post) => {
    post.id = post.length + 1;
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("-")
    );
    setPosts((pState) => {return [...pState, post]});
    setFlashMessage('saved');
  }

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  return (
    <Router>
      <div className="App">
        <Header/>
        { message && <Message type = {message}/> }
        <Routes>
          <Route 
            path = '/'
            element = {<Posts posts = {posts}/>}
          />
          <Route 
            path = '/post/:postSlug'
            element = {<Post posts = {posts} />}
          />
          <Route 
            path = '/new' 
            element = {<PostForm addNewPost = {addNewPost}/>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes> 
      </div>
    </Router>
  );
};

export default App;
