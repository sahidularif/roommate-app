import React, { useContext, useState } from 'react';
// import { getAuth, updateProfile } from "firebase/auth";
import jwt_decode from 'jwt-decode';
import '../../styles/login.css';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { LoginContext, UserActionContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {
    checkSessionUser,
    checkUserType,
    createNewUserWithEmailAndPassword,
    handleGoogleSignIn,
    signInExistingUserWithEmailAndPassword
}
    from './loginHelper';
import { formValidation } from '../../utilities/helperFunction';
import { auth } from './firebaseConfig';
import axios from 'axios';
import { stringify } from 'postcss';

// check is user logged in
export const isLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        return false;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
};



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [userAction, setUserAction] = useContext(UserActionContext); // ** Replacing  [newUser, setNewUser]
    // const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: null,
        email: null,
        password: null,
        cPassword: null,
        tos: false,
    });
    const [errmessage, setErrMessage] = useState({
        formErrors: {},
        loginErrors: {},
    });
    const [error, setError] = useState("")
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || {
        from: { pathname: '/' },
    };
    const { login } = { login: { pathname: '/login' } }
    const { userType } = { userType: { pathname: '/userType' } }
    //Handle Google Sign in
    const googleSignin = () => {
        handleGoogleSignIn().then((res) => {
            handleResponse(res, true);
            // axios.post('')
            // storeAuthToken(res);

        });
    };
    //Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValidation(user, userAction.newUser, setErrMessage)) {

            if (userAction.newUser && user.name && user.email && user.password) {
                createNewUserWithEmailAndPassword(user)
                    .then((res) => {
                        handleResponse(res, true)
                    })
            }
            if (!userAction.newUser && user.email && user.password) {
                signInExistingUserWithEmailAndPassword(user)
                    .then((res) => {
                        handleResponse(res, true)
                        console.log(res)
                    })
            }
        }
    }
    // Handle Response
    const handleResponse = (res, redirect) => {
        //console.log(res.error)
        if (res.error) {
            userAction.newUser && setError(res.error)
            !userAction.newUser && setError(res.error)
            redirect && history.replace(login);
        } else {

            setUser(res);
            setLoggedInUser(res)
            storeAuthToken(res);
            redirect && history.replace(from);
            userAction.newUser && setError('');
            !userAction.newUser && setError('');

        }
    }

    //Hangle Input Change
    const handleInputChange = (e) => {
        let newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }

    //Store Auth Token
    const storeAuthToken = (userInfo) => {
        auth
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            })
            .catch(function (err) {
                // Handle error
                console.log(err)
            });
    };


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
                <div className="login-swithcer text-end">
                    <p>{!userAction.newUser ? 'Not yet a member? ' : 'Already a member? '}
                        <button className='login-btn'
                            onClick={() => setUserAction({newUser: !userAction.newUser})} >
                            {!userAction.newUser ? ' Sign up' : ' Sign in'}
                        </button>
                    </p></div>
                <div className="log-body pt-5">
                    <div class="heading-section text-start">
                        <h2 class="mb-4">{!userAction.newUser ? 'Sign in' : 'Sign up'}</h2>
                    </div>
                    <div className="social-log justify-content-start ">
                        <button type="button" className="google" onClick={googleSignin}>
                            <div><FaGoogle /> <span>Continue with google</span></div></button>
                        <button type="button" className="facebook"><FaFacebook /></button>
                        <button type="button" className="twitter"><FaTwitter /></button>
                    </div>
                    {/* <div className="d-flex justify-content-center align-items-center">
                        <hr style={{ width: '25%' }} /> &nbsp; Or &nbsp;
                        <hr style={{ width: '25%' }} />
                    </div> */}

                    <div className="regular-log">


                        {
                            !userAction.newUser ?

                                /* User Sign In Form */

                                (
                                    <form onSubmit={handleSubmit}>
                                        {user != null && (
                                            <p style={{ maxWidth: '400px' }} className='text-danger'>
                                                {/* * {user.error} */}
                                                {error}
                                            </p>
                                        )}
                                        <div className="input-filds">
                                            <label htmlFor="email">Email</label><br />
                                            <input autoComplete="off" type="text" name="email" id="email"
                                                // className={`${errmessage.formErrors.existingEmail ? 'showError' : ''}`}
                                                onChange={handleInputChange} />
                                            {errmessage.formErrors.email &&
                                                <div className="err-msg"><i class="far fa-exclamation-circle"></i> {errmessage.formErrors.email}</div>
                                            }
                                        </div>
                                        <div className="input-filds">
                                            <label htmlFor="password">Password</label><br />
                                            <input autoComplete="off" type="password" name="password" id="password"
                                                className={`${errmessage.formErrors.password ? 'showError' : ''}`}
                                                onChange={handleInputChange} />
                                            {errmessage.formErrors.password &&
                                                <div className="err-msg"><i class="far fa-exclamation-circle"></i> {errmessage.formErrors.password}</div>
                                            }
                                        </div>
                                        <div className="single-fild">
                                            <button type="submit" className="">Get started</button>
                                        </div>
                                    </form>
                                )
                                :

                                /* User Sign Up Form */

                                (<form onSubmit={handleSubmit}>
                                    {user != null && (
                                        <p style={{ maxWidth: '400px' }} className='text-danger'>
                                            {/* * {user.error} */}
                                            {error}
                                        </p>
                                    )}
                                    <div className="input-filds d-flex">
                                        <div className="single-fild">
                                            <label htmlFor="name">First name</label><br />
                                            <input type="text" name="name"
                                                className={`${errmessage.formErrors.name ? 'showError' : ''}`}
                                                onChange={handleInputChange} />
                                            {errmessage.formErrors.name &&
                                                <div className="err-msg"><i class="far fa-exclamation-circle"></i> {errmessage.formErrors.name}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="input-filds">
                                        <label htmlFor="email">Email</label><br />
                                        <input type="text" name="email" id="email"
                                            className={`${errmessage.formErrors.email ? 'showError' : ''}`}
                                            onChange={handleInputChange} />
                                        {errmessage.formErrors.email &&
                                            <div className="err-msg"><i class="far fa-exclamation-circle"></i> {errmessage.formErrors.email}</div>
                                        }
                                    </div>
                                    <div className="input-filds">
                                        <label htmlFor="password">Password</label><br />
                                        <input type="password" name="password" id="password"
                                            className={`${errmessage.formErrors.password ? 'showError' : ''}`}
                                            onChange={handleInputChange} />
                                        {errmessage.formErrors.password &&
                                            <div className="err-msg"><i class="far fa-exclamation-circle"></i> {errmessage.formErrors.password}</div>
                                        }
                                    </div>
                                    <div className="input-check">
                                        <input type="checkbox" name="tos" id="tos" onChange={handleInputChange} />
                                        <label htmlFor="tos">By creating an account, you are okay with our <a href="/tos">Terms of Condition</a></label>

                                    </div>
                                    {errmessage.formErrors.tos &&
                                        <div className="err-msg"><i class="far fa-exclamation-circle"></i> {errmessage.formErrors.tos}</div>
                                    }
                                    <div className="single-fild">
                                        <button type="submit" className="">Get started</button>
                                    </div>
                                </form>)
                        }


                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default Login;