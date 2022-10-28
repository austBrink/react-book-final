import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header = () => {
    /**@todo confirm that we want onLogout from the context. Why did we pass it onLogin? */
    // const { user, onLogout } = useContext(UserContext); 
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