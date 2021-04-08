import React, { useContext } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { Link, useHistory } from 'react-router-dom';
import './NavigationBar.css'
import logo from '../logo.png'
import { Avatar, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    avatar: {
        height: theme.spacing(5),
        width: theme.spacing(5),
        
    }
}))

export default function NavigationBar() {

    const { currentUser, loadedUserFromStorage } = useContext(AuthenticationContext);
    const { logout, avatarColor } = useContext(AuthenticationContext);
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();

    

    async function handleClick() {
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

    function userNavigationButton() {
        if (!loadedUserFromStorage) {
            return <div style={{ width: '130px' }}></div>;
        }

        if (currentUser) {
            const firstLetter = currentUser?.displayName?.charAt(0).toUpperCase();
            return (
                <>
                    <button onClick={handleClick} className='logout-button'>Log Out</button>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <Avatar 
                        className={classes.avatar} 
                        src={currentUser?.photoURL}
                        style={{backgroundColor: avatarColor}}
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

    return (
        <div className='nav'>
            <Link to='/'><img src={logo} alt='logo' className='logo' /></Link>
            <input type='text' placeholder='Search..' className='search-bar' />
            <div className="user-info-wrapper">{userNavigationButton()}</div>
        </div>
    );

}