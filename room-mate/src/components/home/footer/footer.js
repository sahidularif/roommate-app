import React from 'react';
import { FaFacebook, FaGoogle, FaInstagram } from 'react-icons/fa';
import brand from '../../../images/footer-bg.png';
import { Link } from 'react-router-dom';
import '../../../styles/addListing.css'
const Footer = () => {


    return (
        <footer className="footer-area">
            <div className="footer-tex">
                <div className="brand"><strong>RenterBD</strong></div>
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/portfolio">Our Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/team">Our Team</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact" tabindex="-1" aria-disabled="true">Contact Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login" tabindex="-1" aria-disabled="true">Login</a>
                    </li>
                </ul>
                <div className="copyRight text-center">
                    <p>Copyright-RenterBd.com {(new Date()).getFullYear()} All Rights Reserved</p>
                </div>
                <ul className="social-media list-inline">
                    <li className="list-inline-item"><a href="//facebook.com"><FaFacebook className="icon active-icon" icon={FaFacebook} /></a></li>
                    <li className="list-inline-item"><a href="//google.com"><FaGoogle className="icon" icon={FaGoogle} /></a></li>
                    <li className="list-inline-item"><a href="//instagram.com"><FaInstagram className="icon" icon={FaInstagram} /></a></li>
                </ul>

            </div>
        </footer>

    );
};

export default Footer;