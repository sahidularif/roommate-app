import React, { useContext } from 'react';
import '../../../styles/header.css';
// import logo from '../../../images/logo/  ';
import images from '../../../images/users/person_1.jpg';
import { Link } from 'react-router-dom';
import { LoginContext, SwitchUserContext, UserActionContext } from '../../../App';
import { Button } from 'bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiViewGridAdd } from 'react-icons/hi';

import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const { user, jwt } = useSelector((state) => state.auth)
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
            <div className="">

            </div>

            <ul className='app__navbar-login g-0'>
                {
                    !user ? (
                        <li><a href="/login" className="p__opensans">Log In / Registration</a></li>
                    )
                        :
                        (
                            <li>
                                <img src={images} alt="user" className='app-user-profile' />
                                <ul>
                                    <li class="sub-item">
                                        <span class="material-icons-outlined"> grid_view </span>
                                        <p>Dashboard</p>
                                    </li>
                                    <li class="sub-item">
                                        <span class="material-icons-outlined">
                                            format_list_bulleted
                                        </span>
                                        <p>My Orders</p>
                                    </li>
                                    <li class="sub-item">
                                        <span class="material-icons-outlined"> manage_accounts </span>
                                        <p>Update Profile</p>
                                    </li>
                                    <li class="sub-item">
                                        <span class="material-icons-outlined"> logout </span>
                                        <p>Logout</p>
                                    </li>
                                </ul>
                            </li>
                        )
                }


            </ul>
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