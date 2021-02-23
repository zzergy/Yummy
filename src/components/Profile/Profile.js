import React from 'react';
import NavigationBar from '../NavigationBar/NavigationBar'
import { Link } from 'react-router-dom'

export default function Profile() {
    return (
        <div>
                <NavigationBar />
                <Link to="new-recipe">Create Recipe</Link>
        </div>
    )
}