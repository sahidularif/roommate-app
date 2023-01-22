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
} from './loginHelper';
import { formValidation } from '../../utilities/helperFunction';
import { auth } from './firebaseConfig';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slice/auth.slice';

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



const Signup = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const location = useLocation();
    const {message} = useSelector((state)=>state.messages)
    //Handle Google Sign in
    const googleSignin = () => {
        handleGoogleSignIn().then((res) => {

        });
    };

    console.log(message)
    const initialState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name field is required'),
        email: Yup.string().email('Invalid email address').required('Email field is required'),
        password: Yup.string().required("Password field is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),

    });
    // console.log(userAction)
    const handleRegister = (values) => {
        console.log(values);
        dispatch(register(values))
    }
    return (
        <div className="login-section">
            <div className="flatation">

            </div>
            <div className="log-container">

                <div className="log-body">
                    <div class="heading-section text-start">
                        <h2 class="auth-heading text-center mb-5">Sign up to Renterbd</h2>
                    </div>
                    <div className="social-log justify-content-start ">
                        <button type="button" className="google" onClick={googleSignin}>
                            <div><FaGoogle /> <span>Continue with google</span></div></button>
                        <button type="button" className="facebook"><FaFacebook /></button>
                        <button type="button" className="twitter"><FaTwitter /></button>
                    </div>


                    <div className="regular-log">
                        <Formik
                            onSubmit={handleRegister}
                            initialValues={initialState}
                            validationSchema={validationSchema}
                        >

                            {
                                ({ errors, touched }) => (
                                    <Form autoComplete='off'>

                                        <div className="input-filds">
                                            <label htmlFor="name">Name</label><br />
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name" />
                                            {
                                                touched.name && errors.name ? (<div className="err-msg"><i class="far fa-exclamation-circle"></i> {errors.name}</div>) : ''
                                            }
                                        </div>
                                        <div className="input-filds">
                                            <label htmlFor="email">Email</label><br />
                                            <Field
                                                autoComplete={false}
                                                type="text"
                                                name="email"
                                                id="email" />
                                            {
                                                touched.email && errors.email ? (<div className="err-msg"><i class="far fa-exclamation-circle"></i> {errors.email}</div>) : ''
                                            }
                                        </div>
                                        <div className="input-filds">
                                            <label htmlFor="password">Password</label><br />
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password" />
                                            {
                                                touched.password && errors.password ? (<div className="err-msg"><i class="far fa-exclamation-circle"></i> {errors.password}</div>) : ''
                                            }
                                        </div>
                                        <div className="input-filds">
                                            <label htmlFor="confirmPassword">Confirm password</label><br />
                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                            />
                                            {
                                                touched.confirmPassword && errors.confirmPassword ? (<div className="err-msg"><i class="far fa-exclamation-circle"></i> {errors.confirmPassword}</div>) : ''
                                            }
                                        </div>
                                        <div className="input-check">
                                            <Field
                                                type="checkbox"
                                                name="tos" id="tos" />
                                            <label className='user-tos' htmlFor="tos">I agree to Renterbd <a href="/tos">Terms of Service</a> and  <a href="/tos">Privacy Policy</a></label>

                                        </div>
                                        <div className="single-fild">
                                            <button type="submit" className="">Get started</button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                        <div class="auth-switch text-center pt-5">Already have an account? <a class="text-link" href="/login" >Log in</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;