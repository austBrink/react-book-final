/*
* App.js is the entry point to our components, 
besides index/js it servers as the jsx wrapper and context provider program wide.
*/

// libraries / packages
import React, { useState, useEffect } 
from 'react';

import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useStorageState } from "react-storage-hooks";

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
import {
  login,
  logout,
  deleteRecord,
  updateRecord,
  createRecord,
  getRef,
  getOnValue,
} from './firebase';

const App = () => {

  /*
    Establish state variables using useStorageState hook. 
    posts for the blog posts pulled from firebase.
    user for the email and isAuth status 
    and message to display user messages / updates
  */
  const [ posts, setPosts ] = useStorageState(localStorage, 'state-posts', []);
  const [ user, setUser ] = useStorageState(localStorage, 'state-user', {});
  const [ message, setMessage ] = useState(null);
  const [ messageContent, setMessageContent ] = useState('');

  /* 
    on first component loading (and when setPosts is called to update post list) 
    we'll bring in firebase posts,
    trim up the excess from the database by only saving certain key:values,
    and saving to state.
    We'll use onValue imported from firebase.js utilities. 
    See firebase.js and useEffects dependency array.
  */ 
  useEffect(() => {
    const postsRef = getRef('posts');

    /* 
      getOnValue is just a wrapper to firebase/database onValue.
      onValue takes a firebase database, a ref object (see getRef wrapper above) and a callback. 
      The free snapshot parameter is apparently a reference to the current state (.val?) of the database ref.
    */
    getOnValue(postsRef, (snapshot) => {
      
      const posts = snapshot.val();

      const newStatePosts = [];
      for (let post in posts) {
        newStatePosts.push({
          key: post,
          slug: posts[post].slug,
          title: posts[post].title,
          content: posts[post].content,
        });
      }
      setPosts(newStatePosts);
    });

  }, [setPosts]);


  /*
    Considered putting this in utils. 
    Getting a slug for URL from the post title created by user...
  */
  const getNewSlugFromTitle = (title) => {
    return encodeURIComponent(
      title.toLowerCase().split(" ").join("-")
    );
  };

  /** 
  * Add new post preps a slug. 
  * Then delete the key used in front end (not to confuse with firebase key).
  * Envokes createRecord which is a util wrapper for firebase's push() 
  * create the parameter post to firebase database.
  */
  const addNewPost = (post) => {
    post.slug = getNewSlugFromTitle(post.title);
    delete post.key;
    createRecord('posts', post).then(() => {
      setFlashMessage(`saved`);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  /**
   * Updating the post. Like add, we get a slug from the title... 
   * Envoke updateRecord from firebase utils. 
   */
  const updatePost = (post) => {
    post.slug = getNewSlugFromTitle(post.title);
    updateRecord('posts', post.key, {
      slug: post.slug,
      title: post.title,
      content: post.content
    })
    .then(() => {
      setFlashMessage(`updated`);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  /**
   * Calling deleteRecord to remove this particular post.
   */
  const deletePost = (post) => {
    if(window.confirm('Are you sure you want to delete this post?')){
      deleteRecord('posts',post.key)
      .then(() => {
        setFlashMessage(`deleted`);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  // Logging in the user with firebase util wrappers again. 
  const onLogin = ( email, password ) => {
    login(email, password)
    .then((response) => {
        setUser({
            email: response.user['email'],
            isAuthenticated: true,
        })
    })
    .catch((error) => {
      console.error(error);
      setMessageContent(error);
      setFlashMessage(`error`);
    })
  };

  // Logging the user out using firebase utils. See firebase.js
  const onLogout = ( email, password ) => {
    logout(email, password)
    .then(() => {
      setUser({
        isAuthenticated: false
      })
    }).catch((error) => {console.error(error)});
  };

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  // In app we'll set up a context provider for the user (important for permissions)
  // onLogin and Logout are part of the context value to be used by the Login component.
  return (
    <Router>
      <UserContext.Provider value = {{ user, onLogin, onLogout }}>
        <div className="App">
          <Header/>
          { message && 
              <Message 
                type = {message}
                message = {messageContent}
              /> 
          }
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
