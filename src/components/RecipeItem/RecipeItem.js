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
import React from 'react';
import asd from '../test-thumbnail.jpg'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        // width: "100%"
    },
    media: {
        height: 0,
        paddingTop: 220,
    },
    header: {
        textAlign: "start"
    },
    avatar: {
        backgroundColor: "#ff5722"
    }
}))


export default function RecipeItem({ recipe }) {
    const classes = useStyles();

    return (
        <Card className={classes.mainContainer}>
            <CardHeader
                className={classes.header}
                avatar={<Avatar aria-label="recipe" className={classes.avatar} src={recipe.authorPhotoURL}>{recipe.authorDisplayName.charAt(0)}</Avatar>}
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
                image={asd}
                title="dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
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