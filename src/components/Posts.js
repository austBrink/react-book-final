import React from "react";
import { Link } from "react-router-dom";

const Posts = ( {posts, deletePost} ) => {
    return (
        <article className = 'posts container'>
            <h1>
                Posts
            </h1>
            <ul>
                {posts.length < 1 && (
                    <li key='empty'>no posts</li>
                )}
                {posts.map(p =>(
                    <li key = {p.id}>
                        <h2>
                            <Link to = {`/post/${p.slug}`}>{p.title}</Link>
                        </h2>
                        <p>
                            <Link to = {`/edit/${p.slug}`}>edit</Link>
                            {" | "}
                            <button
                                className="linkLike"
                                onClick={() => deletePost(p)}
                            >Delete</button>
                        </p>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default Posts;