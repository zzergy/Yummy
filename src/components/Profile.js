import React, { useContext } from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import './Home.css';
import Footer from './Footer';
import { Avatar, Container, Grid, Typography, Card } from '@material-ui/core';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    profileWrapper: {
        marginTop: theme.spacing(2)
    },
    avatar: {
        height: theme.spacing(10),
        width: theme.spacing(10)
    },
}));

export default function Profile() {
    const { currentUser } = useContext(AuthenticationContext);
    const classes = useStyles();

    return (
        <div className="wrapper">
            <div className="navigation">
                <NavigationBar />
            </div>
            <Container className={"main " + classes.profileWrapper}>
                <Grid container>
                    {/* Profile Card*/}
                    <Grid item container component={Card} spacing={4} xs={6} alignItems="center">
                        <Grid item>
                            <Avatar
                                className={classes.avatar}
                                src={currentUser?.photoURL}
                            >
                                <Typography variant="h4">
                                    {currentUser?.displayName.charAt(0)}
                                </Typography>
                            </Avatar>
                        </Grid>
                        <Grid item container xs={8} spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{currentUser?.displayName}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="textSecondary">Recipes: 23</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="textSecondary">Likes: 12</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="textSecondary">Shares: 4</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Created Recipes */}
                    <Grid item>

                    </Grid>

                    {/* Liked Recipes */}
                    <Grid item>

                    </Grid>
                </Grid>
            </Container>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}