import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { useHistory } from 'react-router-dom'

export default function Home() {
    const { logout } = useContext(AuthenticationContext);
    const [error, setError] = useState('');
    const history = useHistory();


    async function handleLogout() {
        try {
            await logout();
            history.push('/login');
        } catch{
            setError('Failed to log out');
        }
    }

    return (
        <>
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
        </>
    );
}