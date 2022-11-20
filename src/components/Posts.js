/**
 * Posts displays current posts to page.
 */
import react, { useContext } from "react";
import { Link } from "react-router-dom";

// now import the context object you created.... 
// The provider is elsewhere, usually app.js
import UserContext from "../context/UserContext";

const Posts = ( {posts, deletePost} ) => {
    // posts and delete post were passed in as plain props.
    // user is part of the value in app.js passed to context in provider.
    const { user } = useContext(UserContext);
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
                    <li key = {p.key}>
                        <h2>
                            <Link to = {`/post/${p.slug}`}>{p.title}</Link>
                        </h2>
                        {user?.isAuthenticated && <p>
                            <Link to = {`/edit/${p.slug}`}>edit</Link>
                            {" | "}
                            <button
                                className="linkLike"
                                onClick={() => deletePost(p)}
                            >Delete</button>
                        </p>}
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default Posts;