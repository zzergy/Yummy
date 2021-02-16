import React from 'react';
import Button from '@material-ui/core/Button';
import { NavigationBar } from './NavigationBar/NavigationBar';
import './Home.css';

export default function Home() {

    return (
        <div className='wrapper'>
            <div className="navigation">
                <NavigationBar />
            </div>

            <div className='main'>
                MAIN
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