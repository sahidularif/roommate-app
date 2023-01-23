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
import { useDispatch, useSelector } from 'react-redux';
import { google, signin } from '../../redux/slice/auth.slice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { clearMessage } from 'e:/26.10.2022/react-redux-login-example-master/react-redux-login-example-master/src/slices/message';

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
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch()
    const { message } = useSelector((state) => state.messages)

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
    const handleSubmit = (formValues) => {
        console.log(formValues)
        dispatch(signin(formValues))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                setTimeout(() => {
                    dispatch(clearMessage())
                    history.push(from)
                }, 2000);
            })
            .catch(() => {
                setSuccessful(false);
                setTimeout(() => {
                    dispatch(clearMessage())
                }, 2000);
            });
    }


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required("Password is required"),
    })
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
                        {message && (
                            <div className="form-group p-2">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {
                                ({ errors, touched }) => (
                                    <Form autocomplete="off">
                                        <div className="input-filds">
                                            <label htmlFor="email">Email</label><br />
                                            <Field
                                                autocomplete="off"
                                                type="text"
                                                name="email"
                                                id="email"
                                                placeholder='example@domain.com' />
                                            {
                                                touched.email && errors.email ? (<div className="err-msg"><i class="far fa-exclamation-circle"></i> {errors.email}</div>) : ''
                                            }
                                        </div>
                                        <div className="input-filds">
                                            <label htmlFor="password">Password</label><br />
                                            <Field
                                                autocomplete="off"
                                                type="password"
                                                placeholder='password'
                                                name="password"
                                                id="password" />
                                            {
                                                touched.password && errors.password ? (<div className="err-msg"><i class="far fa-exclamation-circle"></i> {errors.password}</div>) : ''
                                            }
                                        </div>
                                        <div className="single-fild">
                                            <button type="submit" className="">Get started</button>
                                        </div>
                                    </Form>
                                )
                            }

                        </Formik>
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