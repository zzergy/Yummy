import { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/app';
import "firebase/database";
import { AuthenticationContext } from './context/AuthenticationContext';

export default function useAllSavedRecipesFromCurrentUser() {
    const [savedRecipes, setSavedRecipes] = useState();
    const { currentUser } = useContext(AuthenticationContext);

    useEffect(() => {
        const userSavedRecipesRef = firebase.database().ref("usersInfo").child(`${currentUser?.uid}`).child("savedRecipes");
        userSavedRecipesRef.on('value', snapshot => {
            const savedRecipes = snapshot.val();
            const savedRecipesList = [];
            for (let id in savedRecipes) {
                savedRecipesList.push({ ...savedRecipes[id], id });
            }
            setSavedRecipes(savedRecipesList);
        });
    }, [])

    return savedRecipes;
}