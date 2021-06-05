import {useEffect, useState} from 'react'
import firebase from 'firebase/app';
import "firebase/database";
/**
 * Gets only ONE recipe from the Firebase Realtime Database 
 */
export default function useRecipeFromDB(recipeId) {
    const [recipe, setRecipe] = useState({});
    
    useEffect(() => {
        const recipeRef = firebase.database().ref("recipes");
        const onUpdatedRecipes = snapshot => {
            const updatedRecipes = snapshot.val();

            for (let id in updatedRecipes) {
                if (id === recipeId)
                    setRecipe(updatedRecipes[id]);
            }
        };
        recipeRef.on('value', onUpdatedRecipes);
        return () => {
            recipeRef.off('value', onUpdatedRecipes);
        };
    }, [])

    return recipe;
}