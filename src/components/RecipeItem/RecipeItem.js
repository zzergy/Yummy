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

const useStyles = makeStyles(theme => ({
    mainContainer: {
        maxWidth: 345
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


export default function RecipeItem() {
    const classes = useStyles();

    return (
        <Card className={classes.mainContainer}>
            <CardHeader
                className={classes.header}
                avatar={<Avatar aria-label="recipe" className={classes.avatar}>B</Avatar>}
                title="This is a test title"
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image={asd}
                title="dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
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