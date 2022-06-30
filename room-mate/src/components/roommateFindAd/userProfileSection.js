import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext, SwitchUserContext } from '../../App';

const UserProfileSection = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [user, setUser] = useContext(SwitchUserContext)
    // console.log(loggedInUser);
    return (
        <div className='border user-profile-section'>
            <div className='user-image text-center mb-5'>
                <img src={loggedInUser.picture} class="img-thumbnail d-block mx-auto rounded-pill" alt="user" />
                <h6 className='mx-auto'>{loggedInUser.name}</h6>
            </div>
            <div className='nav-menu'>
                {
                    !user.tanent ?
                        (
                            <ul>
                                <li><i class="fas fa-list-ul"></i> <Link to="/dashboard"> Listing</Link></li>
                                <li><i class="far fa-envelope"></i> <Link to="/roommateFind"> Add new listing</Link></li>
                                <li><i class="far fa-envelope"></i> <Link to="/"> Inbox</Link></li>
                            </ul>
                        )
                        :
                        (
                            <ul>
                                <li><i class="fas fa-list-ul"></i> <Link to="/dashboard"> tanent</Link></li>
                                <li><i class="far fa-envelope"></i> <Link to="/tanentAds"> Add new listing</Link></li>
                                <li><i class="far fa-envelope"></i> <Link to="/"> Inbox</Link></li>
                            </ul>
                        )
                }
            </div>
        </div>
    );
};

export default UserProfileSection;