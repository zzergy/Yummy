import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import RecipeItem from "../RecipeItem/RecipeItem"

export default function DisplayRecipesInProfilePage({ recipes }) {
    return (
        <Grid container spacing={3} justify="center">
          {
              recipes && recipes?.length !== 0 ? recipes.map((recipe, index) => (
                <Grid xs={12} item key={index}>
                    <RecipeItem recipe={recipe}/>
                </Grid>
            )) : <Grid item><Typography>You havent added any recipes yet.</Typography></Grid>
          }
        </Grid>
    );
}