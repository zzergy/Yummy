import React, { useContext } from "react"
import { Redirect, Route } from "react-router";
import { AuthenticationContext } from "../context/AuthenticationContext";

export default function PrivateRoute({ component: Component, ...otherProps }) {
    const { currentUser } = useContext(AuthenticationContext);

    return (
        <Route {...otherProps} render={props => (
            currentUser ? <Component {...props} /> :
                <Redirect to="/login" />
        )} />
    );
}