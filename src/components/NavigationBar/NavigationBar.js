import React, { useState, useContext } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { Link, useHistory } from 'react-router-dom';
import './NavigationBar.css'
import logo from '../logo.png'

export function NavigationBar() {

    const { currentUser } = useContext(AuthenticationContext);
    const { logout } = useContext(AuthenticationContext);
    const [error, setError] = useState('');
    const history = useHistory();

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
            console.log(currentUser);
            return (
                <button onClick={handleClick} className='logout-button'>Log Out</button>
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
            <div className='button-wrapper'>{checkForCurrentUser()}</div>
        </div>
    );

}