import React, { useContext } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import '../Home.css';
import Footer from '../Footer';
import { Container, Grid, Typography, Card } from '@material-ui/core';
import { AuthenticationContext } from "../../context/AuthenticationContext";
import ProfileCard from './ProfileCard';
import DisplayRecipesInProfilePage from './DisplayRecipesInProfilePage';
import useAllRecipesFromDB from '../../useAllRecipesFromDB';
import { makeStyles } from "@material-ui/core"
import useAllSavedRecipesFromCurrentUser from '../../useAllSavedRecipesFromCurrentUser';

const useStyles = makeStyles(theme => ({
    titles: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    }
}));

export default function Profile() {
    const { currentUser } = useContext(AuthenticationContext);
    const classes = useStyles();

    const recipes = useAllRecipesFromDB();
    const savedRecipesFromUser = useAllSavedRecipesFromCurrentUser();

    const currentUserRecipes = recipes?.filter(recipe => { return (recipe.authorUid === currentUser?.uid) });
    const recipesCount = currentUserRecipes?.length;

    const likeCount = currentUserRecipes.reduce((acc, currentValue) => {
        if (currentValue.likes?.length) {
            return acc + currentValue.likes?.length;
        } else {
            return acc;
        }
    }, 0 /* The initial value of the previousValue parameter */);
    return (
        <>
        <NavigationBar />

        <div className="wrapper">
            <Container className="main">
                <Grid container spacing={3}>
                    {/* Left */}
                    <Grid item xs={12}>
                        <ProfileCard likeCount={likeCount} recipesCount={recipesCount} />
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container component={Card} style={{ background: "#fefcff" }} justify="center">
                            <Grid item xs={10}>
                                <Typography variant="h5" align="center" className={classes.titles}>Your Recipes</Typography>
                                <div style={{ marginBottom: 35 }}>
                                    <DisplayRecipesInProfilePage recipes={currentUserRecipes} />
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
                                    <DisplayRecipesInProfilePage recipes={savedRecipesFromUser} />
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
        </>
    )
}