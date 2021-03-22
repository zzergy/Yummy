import React, { useContext } from 'react';
import { Avatar, Grid, Typography, Card } from '@material-ui/core';
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    cardRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom: 30,
        backgroundColor: "#f5f5f5"
    },
    avatar: {
        width: '80px',
        height: '80px',
        marginLeft: theme.spacing(1)
    },
    userInformation: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(2)
    },
    userStats: {
        display: 'flex',
        '& > p': {
            marginLeft: theme.spacing(3),
            marginTop: theme.spacing(1)
        },
        '& > p:first-child': {
            marginLeft: 0
        }
    }
}));

export default function ProfileCard({ recipesCount }) {
    const { currentUser } = useContext(AuthenticationContext);
    const classes = useStyles();

    return (
        <Card className={classes.cardRoot}>
                <div>
                    <Avatar
                        className={classes.avatar}
                        src={currentUser?.photoURL}
                    >
                        <Typography variant="h4">
                            {currentUser?.displayName.charAt(0)}
                        </Typography>
                    </Avatar>
                </div>
                <div className={classes.userInformation}>
                    <Typography variant="h4">{currentUser?.displayName}</Typography>
                    <div className={classes.userStats}>
                        <Typography color="textSecondary">Recipes: {recipesCount}</Typography>
                        <Typography color="textSecondary">Likes: 12</Typography>
                        <Typography color="textSecondary">Shares: 4</Typography>
                    </div>

                </div>
        </Card>
    );
}