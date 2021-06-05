import React from 'react';
import { Container, Typography, makeStyles, Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import useRecipeFromDb from '../useRecipeFromDB';
import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer';
import "./Home.css"
import ScroolToTopArrow from './ScrollToTopButton';

const useStyles = makeStyles(theme => ({
    recipeImage: {
        maxWidth: '700px',
        width: "100%",
        height: 'auto',

        border: " 1px solid #ddd",
        borderRadius: "4px",
        padding: "6px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    recipeImageContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    listContainer: {
        background: "#fff7c7",
        boxShadow: "0 1px 1px #e6ddae, 0 10px 0 -5px #e6ddae, 0 10px 1px -4px #e6ddae, 0 20px 0 -10px #d9cf9c, 0 20px 1px -9px rgba(0,0,0,0.15)",
        padding: "30px",
        maxWidth: "auto"
    },
    paper: {
        padding: theme.spacing(4),
    }
}));

export default function ViewRecipe() {
    const classes = useStyles();
    const { recipeId } = useParams();
    const recipe = useRecipeFromDb(recipeId);

    return (
        <>
            <ScroolToTopArrow />
            <NavigationBar />
            <Container className={classes.root}>
                <Grid container spacing={4}>
                    {/* Title */}
                    <Grid item xs={12}>
                        <Typography
                            align="center"
                            variant="h2"
                        >
                            {recipe?.title}
                        </Typography>
                    </Grid>

                    {/* Dish image */}
                    <Grid item className={classes.recipeImageContainer} xs={12}>
                        <img className={classes.recipeImage} alt="dish" src={recipe?.imageUrl} />
                    </Grid>

                    <Grid item container spacing={3}>
                        {/* Inggredients list */}
                        <Grid item xs={12} lg={6} >
                            <Paper className={classes.paper}>
                                <Typography variant="h5" style={{ marginBottom: 20 }}>
                                    Ingredients
                                </Typography>
                                <ul>
                                    {recipe?.ingreedientsList?.split('\n').map(((ingridient, index) => (
                                        <li key={index}>
                                            <Typography variant="body1">{ingridient}</Typography>
                                        </li>
                                    )))}
                                </ul>
                            </Paper>
                        </Grid>

                        {/* Cooking instructions */}
                        <Grid item xs={12} lg={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" style={{ marginBottom: 20 }}>
                                    Cooking instructions
                                </Typography>

                                {recipe?.cookingInstructions?.split('\n').map(((instruction, index) => (
                                    <div key={index}><Typography variant="body1" >{instruction}</Typography><br /></div>
                                )))}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <div className='footer'>
                <Footer />
            </div>
        </>


    );
}