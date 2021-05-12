import {useEffect, useState} from 'react'
import firebase from 'firebase/app';
import "firebase/database";
/**
 * Gets the data from the Firebase Realtime Database 
 */
export default function useAllRecipesFromDB() {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        const recipeRef = firebase.database().ref("recipes");
        recipeRef.on('value', snapshot => {
            const recipes = snapshot.val();
            const recipesList = [];
            for (let id in recipes) {
                recipesList.push({...recipes[id], id});
            }
            setRecipes(recipesList.reverse());
        });
    }, [])

    return recipes;
}