import React, { useContext } from 'react';
import { Avatar, Typography, Card, Button, makeStyles } from '@material-ui/core';
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { Link } from "react-router-dom";
import ChangePassword from "../ChangePassword"

const useStyles = makeStyles(theme => ({
    cardRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: "#fefcff"
    },
    avatar: {
        width: '80px',
        height: '80px',
        marginLeft: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
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
    },
    navigationButtonsContainer: {
        display: "flex",
        flexDirection: "column",
    },
    spacer: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between"
    }
}));

export default function ProfileCard({ recipesCount, likeCount }) {
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
                        {currentUser?.displayName.charAt(0).toUpperCase()}
                    </Typography>
                </Avatar>
            </div>
            <div className={classes.spacer}>
                <div className={classes.userInformation}>
                    <Typography variant="h4">{currentUser?.displayName}</Typography>
                    <div className={classes.userStats}>
                        <Typography color="textSecondary">Recipes: {recipesCount}</Typography>
                        <Typography color="textSecondary">Likes: {likeCount}</Typography>
                        <Typography color="textSecondary">Shares: 4</Typography>
                    </div>
                </div>
                <div className={classes.navigationButtonsContainer}>
                    <Link to="new-recipe">
                        <Button
                            style={{ marginBottom: 10 }}
                            fullWidth
                            variant="outlined"
                            color="primary"
                        >
                            Create a Recipe
                        </Button>
                    </Link>
                    <ChangePassword />
                </div>
            </div>
        </Card>
    );
}