import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import './Home.css';
import Footer from './Footer'
import RecipeItem from './RecipeItem/RecipeItem'
import { Container, Grid } from '@material-ui/core';
import firebase from 'firebase/app';
import "firebase/database";

export default function Home() {
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        const recipeRef = firebase.database().ref("recipes");
        recipeRef.on('value', snapshot => {
            const recipes = snapshot.val();
            const recipesList = [];
            for (let id in recipes) {
                recipesList.push(recipes[id]);
            }
            setRecipes(recipesList);
        });
    }, [])

    return (
        <div className='wrapper'>
            <div className="navigation">
                <NavigationBar />
            </div>

            <Container className="main">
                <Grid container spacing={4}>
                    {recipes ? recipes.map((recipe, index) => (
                        <Grid item container justify="center" xs={12} md={6} lg={4}>
                            <Grid item>
                                <RecipeItem recipe={recipe} key={index}/>
                            </Grid>
                        </Grid>
                    )) : ''}
                </Grid>
            </Container>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
}