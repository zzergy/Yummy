import {
    Card,
    CardMedia,
    CardHeader,
    Avatar,
    makeStyles,
    CardContent,
    Typography,
    CardActions,
    IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useContext } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import noImageFound from '../../img/no-image-found.png'

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
    avatar: {
    }
}))


export default function RecipeItem({ recipe }) {
    const classes = useStyles();
    const { avatarColor } = useContext(AuthenticationContext);

    return (
        <Card className={classes.mainContainer}>
            <CardHeader
                className={classes.header}
                avatar={<Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={recipe.authorPhotoURL}
                    style={{ backgroundColor: avatarColor }}>
                    {recipe.authorDisplayName.charAt(0).toUpperCase()}
                </Avatar>}
                title={recipe.title}
                subheader={recipe.date}
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
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
                <Typography variant="body2" color="textSecondary" component="p" style={{marginLeft: 5}}>
                    {recipe.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}