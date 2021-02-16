import React from 'react';
import Button from '@material-ui/core/Button';
import { NavigationBar } from './NavigationBar/NavigationBar';
import './Home.css';
import Footer from './Footer'

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
                <Footer />
            </div>
        </div>
    );
}