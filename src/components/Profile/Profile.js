import React, { useContext, useState } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import '../Home.css';
import Footer from '../Footer';
import { Container, Grid, Typography, Card } from '@material-ui/core';
import { AuthenticationContext } from "../../context/AuthenticationContext";
import ProfileCard from './ProfileCard';
import UserRecipes from './UserRecipes';
import useAllRecipesFromDB from '../../useAllRecipesFromDB';
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    titles: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    }
}));

export default function Profile() {
    const { currentUser } = useContext(AuthenticationContext);
    const [recipes, setRecipes] = useState();
    const classes = useStyles();

    useAllRecipesFromDB(setRecipes);

    const currentUserRecipes = recipes?.filter(recipe => { return (recipe.uid === currentUser?.uid) });
    const recipesCount = currentUserRecipes?.length;
    return (
        <div className="wrapper">
            <div className="navigation">
                <NavigationBar />
            </div>
            <Container className="main">
                <Grid container spacing={3}>
                    {/* Left */}
                    <Grid item xs={12}>
                        <ProfileCard recipesCount={recipesCount}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container component={Card} style={{ background: "#fefcff" }} justify="center">
                            <Grid item xs={10}>
                                <Typography variant="h5" align="center" className={classes.titles}>Your Recipes</Typography>
                                <div style={{ marginBottom: 35 }}>
                                    <UserRecipes recipes={currentUserRecipes} />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right */}
                    <Grid item xs={6}>
                        <Grid container component={Card} style={{ background: "#fefcff" }} justify="center">
                            <Grid item xs={10}>
                                <Typography variant="h5" align="center" className={classes.titles}>Liked Recipes</Typography>
                                <div style={{ marginBottom: 35 }}>
                                    <UserRecipes recipes={currentUserRecipes} />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}