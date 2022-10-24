import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header className = 'App-header'>
            <ul className = 'container'>
                <Link to={`/`}>
                    <li>A Sample Blog Project</li>
                </Link>
                <li>
                    <Link to="/new">New Post</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </header>
    );
};
export default Header;