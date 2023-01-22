import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext, UserActionContext } from '../../App';
import { isLoggedIn } from '../../utilities/helperFunction';
//   =====================================================================================
const PrivateRoute = ({ children, ...rest }) => {
    const { user, jwt } = useSelector((state) => state.auth)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (user?.email || jwt) ? (
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
    );
};

export default PrivateRoute;