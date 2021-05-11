import {
    Card,
    CardMedia,
    CardHeader,
    Avatar,
    makeStyles,
    CardContent,
    Typography,
    CardActions,
    IconButton
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useContext } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import noImageFound from '../../img/no-image-found.png'
import firebase from 'firebase/app';
import "firebase/database";
import SaveRecipeDropdown from '../../SaveRecipeDropdown'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        // width: "100%",
        backgroundColor: "#fefcff"
    },
    media: {
        height: 0,
        paddingTop: 220,
    },
    header: {
        textAlign: "start"
    },
}))

export default function RecipeItem({ recipe }) {
    const classes = useStyles();
    const { currentUser } = useContext(AuthenticationContext);

    function handleLike() {
        const recipeLikes = recipe.likes || [];
        const isLiked = recipeLikes.includes(currentUser.uid);
        if (!isLiked) {
            const db = firebase.database().ref(`recipes`).child(recipe.id);
            const updatedRecipeWithoutId = { ...recipe, likes: [...recipeLikes, currentUser.uid] };
            delete updatedRecipeWithoutId.id;
            db.set(updatedRecipeWithoutId);
        }
    }

    const likedByCurrentUser = recipe.likes?.includes(currentUser?.uid);

    return (
        <Card className={classes.mainContainer}>
            <CardHeader
                className={classes.header}
                avatar={<Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={recipe.authorPhotoURL}
                    style={{ backgroundColor: "#E73645" }}
                    >
                    {recipe.authorDisplayName.charAt(0).toUpperCase()}
                </Avatar>}
                title={recipe.title}
                subheader={recipe.date}
                action={
                    <SaveRecipeDropdown recipe={recipe}/>
                }
                titleTypographyProps={
                    {
                        noWrap: true,
                        style: {
                            width: '245px'
                        }
                    }
                }
            />
            <CardMedia
                className={classes.media}
                image={recipe.imageUrl ? recipe.imageUrl : noImageFound}
                title="dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginLeft: 5 }}>
                    {recipe.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton disabled={likedByCurrentUser} aria-label="add to favorites" onClick={handleLike}>
                    <FavoriteIcon />
                </IconButton>
                <Typography>{recipe.likes?.length}</Typography>
            </CardActions>
        </Card>
    );
}