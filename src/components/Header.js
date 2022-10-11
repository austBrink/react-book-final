import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header className = 'App-header'>
            <ul className = 'container'>
                <Link to={`/`}>
                    <li>A Sample Blog Project</li>
                </Link>
            </ul>
        </header>
    );
};
export default Header;