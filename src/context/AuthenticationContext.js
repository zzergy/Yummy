import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import firebase from "firebase/app";

export const AuthenticationContext = React.createContext({
    currentUser: {},
    signUp: () => { },
    login: () => { },
    logout: () => { },
    signUpWithGoogle: () => { },
    // resetPassword: () => { },
    // updateEmail: () => { },
    // updatePassword: () => { },
});

export default function AuthenticationProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


    // Executes only once (when the component loads for the first time)
    useEffect(() => {
        // This returns a promise that when it's called it unsubscribeswhen the component UNMOUNTS.

        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    //------------------------------ METHODS ------------------------------
    function signUp(email, password, username) {

        return auth.createUserWithEmailAndPassword(email, password).then(response => {
            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: username
            })
        })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function signUpWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);

    }

    //---------------------------------------------------------------------

    const values = {
        currentUser,
        signUp,
        login,
        logout,
        signUpWithGoogle
        // resetPassword,
        // updateEmail,
        // updatePassword
    }

    return (
        <AuthenticationContext.Provider value={values}>
            {children}
        </AuthenticationContext.Provider>
    );
}