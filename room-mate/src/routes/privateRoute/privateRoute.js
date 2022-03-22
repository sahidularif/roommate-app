import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from '../../App';
import { isLoggedIn } from '../../utilities/helperFunction';
//   =====================================================================================
const PrivateRoute = ({ children, ...rest }) => {
    // Context from app.js
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (loggedInUser.email || isLoggedIn()) ? (
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