import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext, UserActionContext } from '../../App';
import { isLoggedIn } from '../../utilities/helperFunction';
//   =====================================================================================
const PrivateRoute = ({ children, ...rest }) => {
    // Context from app.js
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [userAction, setUserAction] = useContext(UserActionContext);

    // console.log(loggedInUser.user.uid)

    //eQTeYwxwELM4vcvvUoBxcWgEp1E2

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (loggedInUser?.email || isLoggedIn()) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
        // <Route
        //     {...rest}
        //     render={({ location }) =>
        //         (loggedInUser.email || isLoggedIn()) ? (
        //            children
        //         ) : (
        //             <Redirect
        //                 to={{
        //                     pathname: '/login',
        //                     state: { from: location },
        //                 }}
        //             />
        //         )
        //     }
        // />
    );
};

export default PrivateRoute;