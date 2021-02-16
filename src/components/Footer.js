import React from 'react';

export default function Footer() {
    const styles = {
        color: '#757575',
        marginTop: 9
    }

    return (
        <div style={styles}>
                {'Copyright © '}
                <a href='https://github.com/zzergy' style={{ color: '#757575' }}>Zergy</a>
                {' '}
                {new Date().getFullYear()}
                {'.'}
        </div>
    );
}