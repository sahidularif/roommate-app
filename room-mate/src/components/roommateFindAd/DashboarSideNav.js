import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext, SwitchUserContext } from '../../App';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const DashboarSideNav = ({ toggle }) => {
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [user, setUser] = useContext(SwitchUserContext)

    console.log(loggedInUser);
    return (
        <div className='user-profile-section'>
            {/* <div className='user-image text-center mb-5'>
                <img src={loggedInUser.picture} class="img-thumbnail d-block mx-auto rounded-pill" alt="user" />
                <h6 className='mx-auto'>{loggedInUser.name}</h6>

            </div> */}
            <div className='nav-menu'>
                {
                    !user.tanent ?
                        (
                            <ul>
                                <li><i class="fas fa-list-ul"></i> <Link to="/dashboard"> Listing</Link></li><br />
                                <li><i class="far fa-envelope"></i> <Link to="/roommateFind"> Add new listing</Link></li><br />
                                <li><i class="far fa-envelope"></i> <Link to="/"> Inbox</Link></li><br />
                                <li><i class="far fa-envelope"></i> <Link to="/"> Setting</Link></li><br />
                                <li><i class="far fa-envelope"></i> <Link to="/"> Logout</Link></li><br />
                            </ul>
                        )
                        :
                        (
                            <ul>
                                <li><i class="fas fa-list-ul"></i> <Link to="/dashboard"> tanent</Link></li><br />
                                <li><i class="far fa-envelope"></i> <Link to="/tanentAds"> Add new listing</Link></li><br />
                                <li><i class="far fa-envelope"></i> <Link to="/"> Inbox</Link></li><br />
                            </ul>
                        )
                }
            </div>
            <div className='nav-menu_mobile'>

                {
                    toggle ?
                        (<ul>
                            <li><i class="fas fa-list-ul"></i> <Link to="/dashboard"> Listing</Link></li><br />
                            <li><i class="far fa-envelope"></i> <Link to="/roommateFind"> Add new listing</Link></li><br />
                            <li><i class="far fa-envelope"></i> <Link to="/"> Inbox</Link></li><br />
                            <li><i class="far fa-envelope"></i> <Link to="/"> Setting</Link></li><br />
                            <li><i class="far fa-envelope"></i> <Link to="/"> Logout</Link></li><br />
                        </ul>)
                        :
                        (<ul className='mx-0 my-0 justify-content-around'>
                            <li> <Link to="/dashboard"><i class="fas fa-list-ul"></i> </Link></li><br />
                            <li> <Link to="/roommateFind"></Link><i class="far fa-envelope"></i></li><br />
                            <li> <Link to="/"> </Link><i class="far fa-envelope"></i></li><br />
                            <li> <Link to="/"> </Link><i class="far fa-envelope"></i></li><br />
                            <li> <Link to="/"> </Link><i class="far fa-envelope"></i></li><br />
                        </ul>)
                }

                {/* <ul>
                                <li> <Link to="/dashboard"><i class="fas fa-list-ul"></i> </Link></li><br/>
                                <li> <Link to="/tanentAds"><i class="far fa-envelope"></i></Link></li><br/>
                                <li><i class="far fa-envelope"></i> <Link to="/"><i class="far fa-envelope"></i></Link></li><br/>
                            </ul> */}

            </div>
        </div>
    );
};

export default DashboarSideNav;