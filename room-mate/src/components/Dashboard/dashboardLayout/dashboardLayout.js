import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../../styles/roomRegister.css';
import Navbar from '../../home/header/navBar';
import UserProfileSection from '../../roommateFindAd/userProfileSection';
import { BsFillArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
//::::::::::::ROOMMATEFINDADD::::::::::::::
const DashboardLayout = (props) => {
    const [toggle, setToggle] = useState(false)
    return (
        <>
            <div className="">
                <div className="nav-bar">
                    <Navbar />
                </div>
            </div>
            <div className="dashboard-side-nav">
                <div className={`${!toggle ? 'dashboard-side-nav-main' : 'dashboard-side-nav-main__active'} align-items-center justify-content-center`}>
                    <UserProfileSection toggle={toggle}/>
                </div>
                <div className='toggle' onClick={()=> {
                    
                    
                    if(!toggle){
                        document.documentElement.style.setProperty('--toggle-left-margin',  '19%')
                    } else {
                        document.documentElement.style.setProperty('--toggle-left-margin',  '9.7%')
                    }
                    setToggle(!toggle)
                }}>
                    {toggle ? (<BsArrowLeftCircleFill/>) : ( <BsFillArrowRightCircleFill/> )}
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