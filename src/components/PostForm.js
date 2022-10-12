import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const PostForm = (props) => {
    return (
      <form className="container">
        <h1>Add a New Post</h1>
        {/* {_ Title Fields Here _}
        {_ Quill Editor Here _} */}
        <p>
          <button type="submit">Save</button>
        </p>
      </form>
    );
  }
  
  export default PostForm;