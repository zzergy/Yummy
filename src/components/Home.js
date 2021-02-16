import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { useHistory } from 'react-router-dom'
import { NavigationBar } from './NavigationBar/NavigationBar';
import './Home.css';

export default function Home() {
    // const { logout } = useContext(AuthenticationContext);
    // const [error, setError] = useState('');
    // const history = useHistory();


    // async function handleLogout() {
    //     try {
    //         await logout();
    //         history.push('/login');
    //     } catch {
    //         setError('Failed to log out');
    //     }
    // }

    return (
        <div className='wrapper'>

            <div className='nav'>
                <NavigationBar />
            </div>

            <div className='main'>
                Main
                </div>

            <div className='footer'>
                footer
                </div>

            {/* <div style={{ width: '50vw' }}>
                {error.length !== 0 && <span>{error}</span>}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                >
                    Log out
                </Button>
            </div> */}
        </div>
    );
}