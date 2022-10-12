// dependencies
import React, { useState } from 'react';
import './App.css';
// myStuff
import Header from './components/Header.js';
import Posts from './components/Posts.js';
import Post from './components/Post.js';
import { dummyData } from './utils.js';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

const App = (props) => {
  const [ posts, setPosts ] = useState(dummyData);
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route 
            path = '/'
            element = {<Posts posts = {posts}/>}
          />
          <Route 
            path = '/post/:postSlug'
            element = {<Post posts = {posts} />}
          />
        </Routes> 
      </div>
    </Router>
  );
};
export default App;
