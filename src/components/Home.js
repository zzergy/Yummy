import React, { useState } from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import './Home.css';
import Footer from './Footer'
import RecipeCard from './RecipeCard'
import { Container, Grid } from '@material-ui/core';
import useAllRecipesFromDB from '../useAllRecipesFromDB';
import { makeStyles } from "@material-ui/core"
import ScrollToTopButton from "./ScrollToTopButton"

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
        <>
            <NavigationBar />
            <div className='wrapper'>

                <Container className="main">
                    <Grid container spacing={8}>
                        {recipes ? recipes.map((recipe, index) => (
                            <Grid item container justify="center" xs={12} md={6} lg={4} key={index}>
                                <Grid item >
                                    <div className={classes.recipeCard}>
                                        <RecipeCard recipe={recipe} />
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
            <ScrollToTopButton/>
        </>
    );
}