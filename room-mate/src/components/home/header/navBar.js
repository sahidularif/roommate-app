import React, { useContext } from 'react';
import '../../../styles/header.css';
// import logo from '../../../images/logo/  ';
import images from '../../../assets/gericht.png';
import { Link } from 'react-router-dom';
import { LoginContext, SwitchUserContext, UserActionContext } from '../../../App';
import { Button } from 'bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiViewGridAdd } from 'react-icons/hi';

import { MdClose } from 'react-icons/md';
const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [userAction, setUserAction] = useContext(UserActionContext);
    const [user, setUser] = useContext(SwitchUserContext);
    const [toggleMenu, setToggleMenu] = React.useState(false);
    return (

        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <span>Renterbd</span>
            </div>
            <div className="app__navbar-links">
                <li><a href="/home" className="p__opensans">Home</a></li>
                <li><a href="/rooms" className="p__opensans">Rooms</a></li>
                <li><a href="/roommates" className="p__opensans">Roommates</a></li>
                <li><a href="#apartment" className="p__opensans">Apartment</a></li>
                <li><a href="#contact" className="p__opensans">Contact</a></li>
            </div>
            <div className="app__navbar-login">
                <a href="/login" className="p__opensans">Log In / Registration</a>
            </div>
            <div className="app__navbar-smallscreen">
                <HiViewGridAdd color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
                {toggleMenu && (
                    <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
                        <MdClose fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
                        <ul className="app__navbar-smallscreen_links">
                            <li><a href="/home" onClick={() => setToggleMenu(false)}>Home</a></li>
                            <li><a href="/rooms" onClick={() => setToggleMenu(false)}>About</a></li>
                            <li><a href="/roommates" onClick={() => setToggleMenu(false)}>Menu</a></li>
                            <li><a href="#apartment" onClick={() => setToggleMenu(false)}>Apartment</a></li>
                            <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>

    );
};

export default Navbar;