import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'
import logo from '../logo.png'

export function NavigationBar() {
    return (
        <div className='nav'>
            <Link to='/'><img src={logo} alt='logo' className='logo' /></Link>
            <input type='text' placeholder='Search..' className='search-bar'/>
            <div className='button-wrapper'>
                <Link to='/login' className='nav-button'>Sign Up / Login</Link>
            </div>
        </div>
    );

}