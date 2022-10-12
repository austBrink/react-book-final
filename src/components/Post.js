import { React } from 'react';
import { useParams } from 'react-router-dom';

const Post = ({ posts }) => {
    // we're going to need to find the appropriate post 

    const { postSlug } = useParams();
    
    const post = posts.find(
        (post) => post.slug === postSlug
    );
    
    return(
        <article className = 'post container'>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </article>
    );
}

export default Post;