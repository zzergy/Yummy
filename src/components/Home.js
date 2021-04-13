import React, { useState } from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import './Home.css';
import Footer from './Footer'
import RecipeItem from './RecipeItem/RecipeItem'
import { Container, Grid } from '@material-ui/core';
import useAllRecipesFromDB from '../useAllRecipesFromDB';
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    recipeCard: {
        maxWidth: 380,
        minWidth: 380,
    },
}));

export default function Home() {
    const classes = useStyles();
    const recipes = useAllRecipesFromDB();

    return (
        <div className='wrapper'>
            <div className="navigation">
                <NavigationBar />
            </div>

            <Container className="main">
                <Grid container spacing={6}>
                    {recipes ? recipes.map((recipe, index) => (
                        <Grid item container justify="center" xs={12} md={6} lg={4} key={index}>
                            <Grid item >
                                <div className={classes.recipeCard}>
                                    <RecipeItem recipe={recipe}/>
                                </div>
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