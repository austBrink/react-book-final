import React from "react";

const Posts = ({posts}) => {
    return (
        <article className = 'posts container'>
            <h1>Posts</h1>
            <ul>
                {posts.length < 1 && (
                    <li key='empty'>no posts</li>
                )}
                {posts.map(p=>(
                    <li key = {p.id}>
                        <h2>{p.title}</h2>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default Posts;