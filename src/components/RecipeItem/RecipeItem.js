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
import React from 'react';
import asd from '../test-thumbnail.jpg'
import Clamp from "react-multiline-clamp";

const useStyles = makeStyles(theme => ({
    mainContainer: {
        maxWidth: 345,
        minWidth: 345
    },
    media: {
        height: 0,
        paddingTop: 220,
    },
    header: {
        textAlign: "start",
    },
    avatar: {
        backgroundColor: "#ff5722"
    },
}))


export default function RecipeItem({ recipe }) {
    const classes = useStyles();

    return (
        <Card className={classes.mainContainer}>
            <CardHeader
                className={classes.header}
                avatar={<Avatar aria-label="recipe" className={classes.avatar}>B</Avatar>}
                title={recipe.title}
                subheader={recipe.date}
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
            <CardContent style={{ height: '45px' }}>
                <Clamp lines={3}>
                    <Typography style={{
                        overflowWrap: 'break-word',
                    }} variant="body2" color="textSecondary" component="p">
                        {recipe?.description}
                    </Typography>
                </Clamp>
            </CardContent>
            <CardActions >
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" color="textSecondary" component="p">
                    Cooking time: {recipe.time}
                </Typography>
            </CardActions>
        </Card>
    );
}