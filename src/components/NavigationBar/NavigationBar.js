import React, { useState, useContext } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { Link, useHistory } from 'react-router-dom';
import './NavigationBar.css'
import logo from '../logo.png'
import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    avatar: {
        height: theme.spacing(6),
        width: theme.spacing(6),
        backgroundColor: "#ff5722",
    }
}))

export default function NavigationBar() {

    const { currentUser } = useContext(AuthenticationContext);
    const { logout } = useContext(AuthenticationContext);
    const [error, setError] = useState('');
    const history = useHistory();
    const classes = useStyles();

    async function handleClick() {
        try {
            await logout();
            history.push('/');
        } catch {
            setError('Failed to log out');
        }
    }

    function checkForCurrentUser() {
        if (currentUser) {
            const firstLetter = currentUser.displayName?.charAt(0);
            return (
                <>
                    <button onClick={handleClick} className='logout-button'>Log Out</button>
                    <Link to="/profile">
                        <Avatar className={classes.avatar} src={currentUser.photoURL}>{currentUser.displayName && firstLetter}</Avatar>
                    </Link>
                </>
            );
        } else {
            return (
                <Link to='/login' className='nav-button'>Sign Up / Login</Link>
            );
        }
    }

    return (
        <div className='nav'>
            <Link to='/'><img src={logo} alt='logo' className='logo' /></Link>
            <input type='text' placeholder='Search..' className='search-bar' />
            <div className="user-info-wrapper">{checkForCurrentUser()}</div>
        </div>
    );

}