/*
* App.js is the entry point of our components, besides index/js it servers as the jsx wrapper and context provider program wide.
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
      // we'll want someplace to dump the trimmed database content to store in state. 
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

  const getNewSlugFromTitle = (title) => {
    return encodeURIComponent(
      title.toLowerCase().split(" ").join("-")
    );
  };

  const addNewPost = (post) => {
    post.slug = getNewSlugFromTitle(post.title);
    delete post.key;
    createRecord('posts', post).then(() => {
      setFlashMessage(`saved`);
    })
    // .catch((error) => {
    //   // The write failed...
    // });
  };

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
    // .catch((error) => {
    //   // The write failed...
    // });
  };

  const deletePost = (post) => {
    if(window.confirm('Are you sure you want to delete this post?')){
      deleteRecord('posts',post.key)
      .then(() => {
        setFlashMessage(`deleted`);
      })
      // .catch((error) => {
      //   // The write failed...
      // });
    }
  };

  const onLogin = ( email, password ) => {
    login(email, password)
    .then((response) => {
        setUser({
            email: response.user['email'],
            isAuthenticated: true,
        })
    })
    .catch(error => console.error(error))
  };

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
