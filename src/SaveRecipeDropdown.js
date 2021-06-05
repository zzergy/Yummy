import React, { useState, useContext } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, MenuItem, Popover } from '@material-ui/core'
import { AuthenticationContext } from './context/AuthenticationContext';
import firebase from 'firebase/app';
import "firebase/database";
import { useSnackbar } from 'notistack';

export default function SaveRecipeDropdown({ recipe }) {
    const [anchorElement, setAnchorElement] = useState(null);
    const { currentUser } = useContext(AuthenticationContext);
    const { enqueueSnackbar } = useSnackbar();
    const handleClick = (event) => {
        //If there is an element it will read as true
        setAnchorElement(event.currentTarget);
    }

    const handleExitPopUp = () => {
        setAnchorElement(null)
    }

    const deleteRecipe = () => {
        setAnchorElement(null);
        const targetedRecipe = firebase.database().ref("recipes").child(`${recipe.id}`);
        targetedRecipe.remove().then(() => {
            enqueueSnackbar(
                "Successfuly deleted recipe", {
                preventDuplicate: true,
                variant: "success"
            });
        }).catch((error) => {
            enqueueSnackbar(
                error.message, {
                preventDuplicate: true,
                variant: "error"
            });
        })
    }

    const saveRecipe = () => {
        setAnchorElement(null);

        const currentRecipeSavedByArray = recipe?.savedBy || [];

        //Check if the recipe is already saved
        const alreadySaved = currentRecipeSavedByArray.some(userId => userId === currentUser?.uid);

        if (!alreadySaved) {
            //Create a reference to the db
            const userSavedRecipesRef = firebase.database().ref(`recipes/${recipe.id}`);
            const updatedRecipe = { ...recipe, savedBy: [...currentRecipeSavedByArray, currentUser?.uid] }

            //Update the database
            userSavedRecipesRef.set(updatedRecipe).then(() => {
                enqueueSnackbar(
                    "Recipe Saved !", {
                    variant: "success"
                });
            }).catch(error => {
                enqueueSnackbar(
                    error.message, {
                    preventDuplicate: true,
                    variant: "error"
                });
            })
        } else {
            enqueueSnackbar(
                "Recipe already saved", {
                preventDuplicate: true,
                variant: "info"
            });
        }
    }

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            {currentUser ?
                <Popover
                    open={!!anchorElement}
                    anchorEl={anchorElement}
                    onClose={handleExitPopUp}
                    disableRestoreFocus
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={saveRecipe}>Save</MenuItem>
                    {currentUser?.uid === recipe.authorUid &&
                        <>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem onClick={deleteRecipe}>Delete</MenuItem>
                        </>
                    }

                </Popover> : ""}
        </div>
    )
}