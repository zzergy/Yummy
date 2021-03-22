import {useEffect} from 'react'
import firebase from 'firebase/app';
import "firebase/database";

export default function useAllRecipesFromDB(setRecipes) {
    useEffect(() => {
        const recipeRef = firebase.database().ref("recipes");
        recipeRef.on('value', snapshot => {
            const recipes = snapshot.val();
            const recipesList = [];
            for (let id in recipes) {
                recipesList.push(recipes[id]);
            }
            setRecipes(recipesList);
        });
    }, [])
}