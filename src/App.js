// dependencies
import React, { useState, useEffect } from 'react';

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {firebase} from './firebase';

// my stuff
import './App.css';
import UserContext from './context/UserContext';
import Header from './components/Header.js';
import Posts from './components/Posts.js';
import Post from './components/Post.js';
import NotFound from './components/NotFound';
import PostForm from './components/PostForm';
import Message from './components/Message';
import Login from './components/Login';
import { useStorageState } from "react-storage-hooks";

const App = () => {

  const [ posts, setPosts ] = useStorageState(localStorage, `state-posts`, []);
  const [ user, setUser ] = useStorageState(localStorage, "state-user", {});
  const [ message, setMessage ] = useState(null);

  const getNewSlugFromTitle = (title) => {
    return encodeURIComponent(
      title.toLowerCase().split(" ").join("-")
    );
  };

  const addNewPost = (post) => {
    const postsRef = firebase.database().ref("posts");
    post.slug = getNewSlugFromTitle(post.title);
    delete post.key;
    postsRef.push(post);
    setFlashMessage('saved');
  };

  // The book claims this is a common js solution to modifying a particular element in an array. I suppose if it needs to stay sorted then yes? 
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
  };

  const onLogin = ( email, password ) => {
    signInWithEmailAndPassword(firebase, email, password)
    .then((response) => {
        setUser({
            email: response.user['email'],
            isAuthenticated: true,
        })
    })
    .catch(error => console.error(error))
  };

  const onLogout = ( email, password ) => {
    signOut(firebase, email, password)
    .then((response) => {
      setUser({
        isAuthenticated: false
      })
    }).catch((error) => {console.error(error)});
  };

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  // const userStateWrapper = (user) => {
  //   setUser({...user});
  // }

  return (
    <Router>
      <UserContext.Provider value = {{ user, onLogin, onLogout }}>
        <div className="App">
          <Header/>
          { message && <Message type = {message}/> }
          <Routes>
          <Route
            exact
            path="/login"
            element={!user?.isAuthenticated ? <Login /> : <Navigate to = {'/'} replace/>}
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
                user?.isAuthenticated ? 
                <PostForm 
                  addNewPost = {addNewPost}
                  post = {{
                    id: null,
                    slug: '',
                    title: '',
                    content: ''
                  }}
                  posts = {posts}
                />
                : <Navigate to = "/login" replace />
              }
            />
            <Route 
              path = '/edit/:postSlug'
              element = {
                user?.isAuthenticated ?
                <PostForm 
                  posts = {posts}
                  updatePost = {updatePost}
                />
                : <Navigate to = '/login' replace />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes> 
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
