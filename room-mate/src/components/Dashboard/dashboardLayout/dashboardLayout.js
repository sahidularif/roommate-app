import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../../styles/roomRegister.css';
import Navbar from '../../home/header/navBar';
import UserProfileSection from '../../roommateFindAd/userProfileSection';

//::::::::::::ROOMMATEFINDADD::::::::::::::
const DashboardLayout = (props) => {

    return (
        <>
            <div className="bg-danger">
                <div className="nav-bar">
                    <Navbar />
                </div>
            </div>
            <div className="dashboard-side-nav">
                <div className="dashboard-side-nav-main p-4 align-items-center justify-content-center">
                    <UserProfileSection />
                </div>
                <div className="dashboard-main-section">
                   {
                       props.children
                   }
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;