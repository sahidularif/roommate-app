import React, { useState } from 'react';
import '../../styles/login.css';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const RoomFindAd = () => {

    return (
        <div className="login-section">
            {/* <div className="log-wrapper"> */}
            <div className="flatation pt-5">
                <div className="about-us heading-section pt-5">
                    <h2 class="pt-4"><strong>RenterBD</strong></h2>
                </div>
                <span class="subheading">your amazing room and roommate</span>
                <div className="flat-img">
                </div>
            </div>
            <div className="log-container">
                <div className="login-swithcer text-end"><p>Welcome to RenterBD<strong> Find your room</strong></p></div>

            </div>
            {/* </div> */}
        </div>
    );
};

export default RoomFindAd;