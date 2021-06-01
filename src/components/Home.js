import React, { useEffect, useState } from 'react';
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
    recipeContainer: {
        display: "flex",
        justifyContent:"space-evenly"
    }
}));

export default function Home() {
    const classes = useStyles();
    const recipes = useAllRecipesFromDB();
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const handleSearch = (value) => {
        const recipesWithSearchTerm = recipes.filter(recipe => recipe.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredRecipes(recipesWithSearchTerm);
    }

    useEffect(() => {
        setFilteredRecipes(recipes);
    }, [recipes]);

    return (
        <>
            <NavigationBar handleSearch={handleSearch} />
            <div className='wrapper'>
                <Container className="main">
                    <Grid container spacing={8} className={classes.recipeContainer}>
                        {filteredRecipes.map((recipe, index) => {
                            const lgWidth = filteredRecipes.length === 1 ? 12 : 4;
                            return <Grid item container justify="center" xs={12} md={6} lg={lgWidth} key={index} >
                                    <Grid item>
                                        <div className={classes.recipeCard}>
                                            <RecipeCard recipe={recipe} />
                                        </div>
                                    </Grid>
                                </Grid>;
                        })}
                    </Grid>
                </Container>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
            <ScrollToTopButton />
        </>
    );
}