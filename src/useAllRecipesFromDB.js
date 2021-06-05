import {useEffect, useState} from 'react'
import firebase from 'firebase/app';
import "firebase/database";
/**
 * Gets all of the recipes from the Firebase Realtime Database 
 */
export default function useAllRecipesFromDB() {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        const recipeRef = firebase.database().ref("recipes");
        const onRecipesUpdated = snapshot => {
            const recipes = snapshot.val();
            const recipesList = [];
            for (let id in recipes) {
                recipesList.push({...recipes[id], id});
            }
            setRecipes(recipesList.reverse());
        };
        recipeRef.on('value', onRecipesUpdated);

        return () => {
            recipeRef.off('value', onRecipesUpdated);
        };
    }, [])

    return recipes;
}