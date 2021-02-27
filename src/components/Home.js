import React from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import './Home.css';
import Footer from './Footer'
import RecipeItem from './RecipeItem/RecipeItem'
import { Container, Grid } from '@material-ui/core';

export default function Home() {

    return (
        <div className='wrapper'>
            <div className="navigation">
                <NavigationBar />
            </div>

            <Container className="main">
                <Grid container spacing={4}>
                    <Grid item container justify="center" xs={12} md={6} lg={4}>
                        <Grid item>
                            <RecipeItem />
                        </Grid>
                    </Grid>
                    <Grid item container justify="center" xs={12} md={6} lg={4}>
                        <Grid item>
                            <RecipeItem />
                        </Grid>
                    </Grid>
                    <Grid item container justify="center" xs={12} md={6} lg={4}>
                        <Grid item>
                            <RecipeItem />
                        </Grid>
                    </Grid>
                    <Grid item container justify="center" xs={12} md={6} lg={4}>
                        <Grid item>
                            <RecipeItem />
                        </Grid>
                    </Grid>
                    <Grid item container justify="center" xs={12} md={6} lg={4}>
                        <Grid item>
                            <RecipeItem />
                        </Grid>
                    </Grid>
                    <Grid item container justify="center" xs={12} md={6} lg={4}>
                        <Grid item>
                            <RecipeItem />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
}