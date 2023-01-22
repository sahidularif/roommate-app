import React, { useContext, useState } from 'react';
// import { getAuth, updateProfile } from "firebase/auth";
import jwt_decode from 'jwt-decode';
import '../../styles/login.css';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { LoginContext, UserActionContext } from '../../App';
import { Redirect, useHistory, useLocation } from 'react-router';
import {
    checkSessionUser,
    checkUserType,
    createNewUserWithEmailAndPassword,
    handleGoogleSignIn,
    signInExistingUserWithEmailAndPassword
} from './loginHelper';
import { formValidation } from '../../utilities/helperFunction';
import { auth } from './firebaseConfig';
import { useDispatch } from 'react-redux';
import { google } from '../../redux/slice/auth.slice';

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
    // const [id, setId] = useContext(IdContext); // ** Replacing  [newUser, setNewUser]
    // const [newUser, setNewUser] = useState(false);
    const dispatch = useDispatch()
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
        dispatch(google())
            .unwrap()
            .then(() => history.replace(from))
            .catch(() => history.replace(login))

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
                        // console.log(res)
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
            // console.log(res.user);
            setLoggedInUser(res.user)
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
                // console.log(err)
            });
    };

    // console.log(userAction)
    return (
        <div className="login-section">
            {/* <div className="log-wrapper"> */}
            <div className="flatation">

            </div>
            <div className="log-container">

                <div className="log-body mx-auto">
                    <div class="heading-section text-start mb-5">
                        <h2 class="auth-heading text-center">Log in to Renterbd</h2>
                    </div>
                    <div className="social-log justify-content-start ">
                        <button type="button" className="google" onClick={googleSignin}>
                            <div><FaGoogle /> <span>Continue with google</span></div></button>
                        <button type="button" className="facebook"><FaFacebook /></button>
                        <button type="button" className="twitter"><FaTwitter /></button>
                    </div>


                    <div className="regular-log">

                        <form onSubmit={handleSubmit} autocomplete="off">
                            {user != null && (
                                <p style={{ maxWidth: '400px' }} className='text-danger'>
                                    {/* * {user.error} */}
                                    {error}
                                </p>
                            )}
                            <div className="input-filds">
                                <label htmlFor="email">Email</label><br />
                                <input
                                    autocomplete="off"
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder='example@domain.com'
                                    onChange={handleInputChange} />
                                {errmessage.formErrors.email &&
                                    <div className="err-msg"><i class="far fa-exclamation-circle"></i> {errmessage.formErrors.email}</div>
                                }
                            </div>
                            <div className="input-filds">
                                <label htmlFor="password">Password</label><br />
                                <input
                                    autocomplete="off"
                                    type="password"
                                    placeholder='password'
                                    name="password"
                                    id="password"
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
                    </div>
                    <div class="auth-switch text-center pt-5">
                        No Account? Sign up <a class="text-link" href="/signup" >here</a>.
                    </div>
                </div>

            </div>
            {/* </div> */}
        </div>
    );
};

export default Login;