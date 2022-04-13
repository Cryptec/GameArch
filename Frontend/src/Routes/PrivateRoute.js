  
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin, isSession } from '../utils';


const PrivateRoute = ({ component: Component, ...rest }) => {

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            isLogin() && isSession() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;