import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/header.css';
import { FaFacebook, FaInstagram, FaTwitterSquare } from 'react-icons/fa';
const Header = () => {
    return (
        <div className="header">
            <div className="top-nav">
                <ul>
                    <li><a href="www.facebook.com"><FaFacebook/></a></li>
                    <li><a href="www.facebook.com"><FaInstagram/></a></li>
                    <li><a href="www.facebook.com"><FaTwitterSquare/></a></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;