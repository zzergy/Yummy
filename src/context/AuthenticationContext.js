import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import firebase from "firebase/app";
import generateRandomColor from '../generateRandomColor';

export const AuthenticationContext = React.createContext({
    currentUser: {},
    avatarColor: "",
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
    const [avatarColor, setAvatarColor] = useState("");

    const loadedUserFromStorage = useRef(false);

    // Executes only once (when the component loads for the first time)
    useEffect(() => {
        // This returns a promise that when it's called it unsubscribes when the component UNMOUNTS.

        const unsubscribe = auth.onAuthStateChanged(user => {
            loadedUserFromStorage.current = true;
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    //------------------------------ METHODS ------------------------------
    function signUp(email, password, username) {
        setAvatarColor(generateRandomColor());

        return auth.createUserWithEmailAndPassword(email, password).then(response => {
            const user = response.user;
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
        setAvatarColor(generateRandomColor());
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);

    }

    //---------------------------------------------------------------------

    const values = {
        currentUser,
        avatarColor, 
        signUp,
        login,
        logout,
        signUpWithGoogle,
        loadedUserFromStorage: loadedUserFromStorage.current
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