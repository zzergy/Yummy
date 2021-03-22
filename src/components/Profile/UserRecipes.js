import React from 'react';
import { Grid } from "@material-ui/core";
import RecipeItem from "../RecipeItem/RecipeItem"

export default function ProfileAuthorRecipes({ recipes }) {

    return (
        <Grid container spacing={3} justify="center">
            {recipes ? recipes.map((recipe, index) => (
                <Grid xs={12} item key={index}>
                    <RecipeItem recipe={recipe} />
                </Grid>
            )) : ''}
        </Grid>
    );
}