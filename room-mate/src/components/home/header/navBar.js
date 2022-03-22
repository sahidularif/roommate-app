import React, { useContext } from 'react';
import '../../../styles/header.css';
// import logo from '../../../images/logo/  ';
import { Link } from 'react-router-dom';
import { LoginContext, UserActionContext } from '../../../App';
const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [userAction, setUserAction] = useContext(UserActionContext);

    return (
        <div className="navbar align-items-center">
            <div className="brand"><strong>RenterBD</strong></div>
            <div className="navs align-items-center">
                <ul className="">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/rooms">Rooms</Link></li>
                    <li><Link to="/apartments">Apartments</Link></li>
                    <li><Link to="/parkings">Parkings</Link></li>
                </ul>
            </div>
            {
                loggedInUser.email ?
                    (
                        <div class="dropdown">
                            <a class="btn rounded-pill text-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-user-circle"></i>
                            </a>

                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    )
                    :
                    (
                        <div className="nav-btn flex">
                            <Link to="/login"><button class="sign-in" onClick={() => setUserAction({newUser: false})}>Sign in</button></Link>
                            <Link to="/login"><button class="sign-up" onClick={() => setUserAction({newUser: true})}>Sign up</button></Link>
                        </div>
                    )
            }
        </div>
    );
};

export default Navbar;