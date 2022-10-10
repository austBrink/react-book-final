// dependencies
import React, {useState} from 'react';
import './App.css';
// myStuff
import Header from './components/Header.js';
import Posts from './components/Posts.js';
import {dummyData} from './utils.js';

const App = (props) => {
  const [ posts, setPosts ] = useState(dummyData);
  return (
    <div className="App">
      <Header/> 
      <Posts posts = {posts}/>
    </div>
  );
};

export default App;
