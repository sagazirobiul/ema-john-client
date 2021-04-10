import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
    const [,setLoggedInUser] = useContext(UserContext);
    const clearSessionStorage = () => sessionStorage.clear();
    return (
        <div className="header">
            <img src={logo} alt="logo"/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={() => {setLoggedInUser({}); clearSessionStorage()}}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;