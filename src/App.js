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
import Login from './components/Login';
import { onLogin } from './firebase';
import { dummyData } from './utils.js';
import { useStorageState } from "react-storage-hooks";

const App = () => {

  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []);
  const [ message, setMessage ] = useState(null);

  const getNewSlugFromTitle = (title) => {
    return encodeURIComponent(
      title.toLowerCase().split(" ").join("-")
    );
  };

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = getNewSlugFromTitle(post.title);
    setPosts((pState) => {return [...pState, post]});
    setFlashMessage('saved');
  }

  // the book claims this is a common js solution to modifying a particular element in an array. I suppose if it needs to stay sorted then yes? 
  const updatePost = (post) => {
    post.slug = getNewSlugFromTitle(post.title);
    const index = posts.findIndex((p) => p.id === post.id);
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1));
    const updatedPosts = [...oldPosts, post].sort((a,b) => a.id-b.id);
    setPosts(updatedPosts);
    setFlashMessage(`updated`);
  };

  const deletePost = (post) => {
    if(window.confirm('Are you sure you want to delete this post?')){
      const lessPosts = posts.filter((p) => p.id !== post.id);
      setPosts(lessPosts);
      setFlashMessage(`deleted`);
    }
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
          exact
          path="/login"
          element={<Login onLogin = {onLogin} />}
        />
          <Route 
            path = '/'
            element = {<Posts posts = {posts} deletePost = {deletePost}/>}
          />
          <Route 
            path = '/post/:postSlug'
            element = {<Post posts = {posts}/>}
          />
          {/* To make the component logic simpler, always give it a post prop, even if its null. We'll be using it to 'update' as well */}
          <Route 
            path = '/new' 
            element = {
              <PostForm 
                addNewPost = {addNewPost}
                post = {{
                  id: 0,
                  slug: '',
                  title: '',
                  content: ''
                }}
                posts = {posts}
              />
            }
          />
          <Route 
            path = '/edit/:postSlug'
            element = {
              <PostForm 
                posts = {posts}
                updatePost = {updatePost}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes> 
      </div>
    </Router>
  );
};

export default App;
