import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { Link, useHistory } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../logo.png';
import { Avatar, makeStyles, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    avatar: {
        height: theme.spacing(5),
        width: theme.spacing(5),
        backgroundColor: theme.palette.primary.main,
    }
}))

export default function NavigationBar({ handleSearch }) {

    const { currentUser, loadedUserFromStorage } = useContext(AuthenticationContext);
    const { logout } = useContext(AuthenticationContext);
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const location = useLocation();
    const [navigationBarStyles, setNavigationBarStyles] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    async function handleLogout() {
        try {
            await logout();
            history.push('/');
        } catch (logoutError) {
            enqueueSnackbar(
                logoutError.message, {
                preventDuplicate: true,
            });
        }
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 69) {
            setNavigationBarStyles(true);
        } else {
            setNavigationBarStyles(false);
        }
    })

    function userNavigationButton() {
        if (!loadedUserFromStorage) {
            return <div style={{ width: '130px' }}></div>;
        }

        if (currentUser) {
            const firstLetter = currentUser?.displayName?.charAt(0).toUpperCase();
            return (
                <>
                    <button onClick={handleLogout} className='logout-button'>Log Out</button>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <Avatar
                            className={classes.avatar}
                            src={currentUser?.photoURL}
                        >
                            {firstLetter}</Avatar>
                    </Link>
                </>
            );
        } else {
            return (
                <Link to='/login' className='nav-button'>Sign Up / Login</Link>
            );
        }
    }

    const onSearchValueChange = (event) => {
        setSearchTerm(event.target.value);
        if (location.pathname === "/") {
            handleSearch(event.target.value)
        } 
    }

    return (
        <div className={navigationBarStyles ? "nav scrolled" : "nav"}>
            <Link to='/'><img src={logo} alt='logo' className='logo' /></Link>
            <TextField
                variant="outlined"
                label="Search.."
                onChange={onSearchValueChange}
                value={searchTerm}
            />
            <div className="user-info-wrapper">{userNavigationButton()}</div>
        </div>
    );

}