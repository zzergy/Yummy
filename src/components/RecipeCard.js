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
import { AuthenticationContext } from '../context/AuthenticationContext';
import noImageFound from '../img/no-image-found.png'
import firebase from 'firebase/app';
import "firebase/database";
import SaveRecipeDropdown from '../SaveRecipeDropdown'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        backgroundColor: "#fefcff"
    },
    media: {
        height: 0,
        paddingTop: 220,
    },
    header: {
        textAlign: "start"
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    },
    disabledLikeButton: {
        color: theme.palette.secondary.light
    },
}))

export default function RecipeCard({ recipe }) {
    const classes = useStyles();
    const { currentUser } = useContext(AuthenticationContext);
    const likedByCurrentUser = recipe.likes?.includes(currentUser?.uid);

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

    return (
        <Card className={classes.mainContainer}>
            <CardHeader
                className={classes.header}
                avatar={<Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={recipe.authorPhotoURL}
                >
                    {recipe.authorDisplayName.charAt(0).toUpperCase()}
                </Avatar>}
                title={recipe.title}
                subheader={recipe.date}
                action={
                    <SaveRecipeDropdown recipe={recipe} />
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
                    <FavoriteIcon className={likedByCurrentUser ? classes.disabledLikeButton : ""} />
                </IconButton>
                <Typography>{recipe.likes?.length}</Typography>
            </CardActions>
        </Card>
    );
}