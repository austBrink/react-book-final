import { React } from 'react';

const Post = ({post}) => {
    return(
        <article className = 'post container'>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </article>
    );
}

export default Post;