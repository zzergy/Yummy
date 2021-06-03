import { Container, Typography, makeStyles, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeFromDb from '../useRecipeFromDB';
import NavigationBar from './NavigationBar/NavigationBar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(4)
    },
    recipeImage: {
        maxWidth: '700px',
        height: 'auto'
    },
    recipeImageContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default function ViewRecipe() {
    const classes = useStyles();
    const { recipeId } = useParams();
    const recipe = useRecipeFromDb(recipeId);

    return (
        <>
            <NavigationBar />
            <Container className={classes.container}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Link to="/">
                        <Button color="primary">
                        Back to all recipies
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Typography align="center" variant="h2">
                        {recipe?.title}
                    </Typography>
                </Grid>
                <Grid className={classes.recipeImageContainer} item xs={12}>
                    <img className={classes.recipeImage} src={recipe?.imageUrl} />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h4">
                        Ingridients
                        </Typography>
                    <ul>
                        {recipe?.ingreedientsList?.split('\n').map((ingridient => (
                            <li>
                                <Typography variant="body1">{ingridient}</Typography>
                            </li>
                        )))}
                    </ul>
                </Grid>

                <Grid item xs={12}>
                    {recipe?.cookingInstructions?.split('\n').map((instruction => (
                        <><Typography variant="body1">{instruction}</Typography><br/></>
                    )))}
                </Grid>
            </Grid>
        </Container>
        </>
       

    );
}