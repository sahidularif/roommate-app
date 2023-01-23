import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
//   =====================================================================================
const PrivateRoute = ({ children, ...rest }) => {
    const { jwt } = useSelector(
        (state) => state.auth
    );

    const isValidJWT = () => {
        const token = sessionStorage.getItem('token');
        if (!jwt) return false;
        const decodedToken = jwtDecode(token);
        const jwtExpirationMs = decodedToken.exp * 1000;
        return decodedToken.exp > jwtExpirationMs;
    }
    useEffect(() => {
        if (!jwt && !isValidJWT) return;
    }, [])

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (jwt && isValidJWT) ? (
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