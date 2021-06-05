import React, { useContext, useState } from 'react';
import {
    Modal,
    Button,
    makeStyles,
    IconButton,
    Fade,
    Container,
    Grid,
    TextField,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { useSnackbar } from 'notistack';
import { AuthenticationContext } from '../context/AuthenticationContext';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
    },
    submitButton: {
        display: "flex",
        justifyContent: "center",
    }
}));

export default function ChangePassword() {
    const classes = useStyles();
    const [tiggerPopup, setTriggerPopup] = useState(false);
    const [newUserData, setNewUserData] = useState({ password: "", confirmPassword: "" })
    const [error, setError] = useState({ didError: false, message: "" });
    const { enqueueSnackbar } = useSnackbar();
    const { currentUser } = useContext(AuthenticationContext);

    const handleClose = () => {
        setTriggerPopup(false);
        setNewUserData({
            ...newUserData,
            email: "",
            password: "",
            confirmPassword: ""
        })
        setError({ ...error, didError: false, message: "" })
    }

    const handleOpen = () => {
        setTriggerPopup(true);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewUserData({ ...newUserData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newUserData.password && newUserData.confirmPassword !== "") {
            //Check for matching passwords
            if (newUserData.password !== newUserData.confirmPassword) {
                return setError({ ...error, didError: true, message: "Passwords must match" })
            } else {
                setError({ ...error, didError: false, message: "" })
                //Update password
                currentUser.updatePassword(newUserData.password).then(() => {
                    enqueueSnackbar(
                        "Password was successfully reset", {
                        preventDuplicate: true,
                        variant: "success"
                    });
                    handleClose();
                }).catch((error) => {
                    enqueueSnackbar(
                        error.message, {
                        preventDuplicate: true,
                        variant: "error"
                    });
                })
            }
        }



    }

    return (
        <>
            {currentUser?.email.includes("gmail") ? "" :
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={handleOpen}
                >
                    Change Password
                </Button>
            }

            <Modal
                open={tiggerPopup}
                className={classes.modal}
                closeAfterTransition
            >
                <Fade in={tiggerPopup}>
                    <Container maxWidth="sm">
                        <Card component="form" onSubmit={handleSubmit}>
                            <CardHeader
                                className={classes.cardHeader}
                                title={<Typography variant="h5">Reset password</Typography>}
                                action={<IconButton aria-label="close" onClick={handleClose}>
                                    <CloseRoundedIcon />
                                </IconButton>}
                            >
                            </CardHeader>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            error={error.didError}
                                            helperText={error.message}
                                            onChange={handleChange}
                                            value={newUserData.password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            label="Confirm password"
                                            type="password"
                                            error={error.didError}
                                            helperText={error.message}
                                            onChange={handleChange}
                                            value={newUserData.confirmPassword}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions className={classes.submitButton}>
                                <Button
                                    style={{ minWidth: 400, maxWidth: 400, marginBottom: 10 }}
                                    type="submit"
                                    variant="outlined"
                                    color="secondary"
                                >
                                    Save Password
                                    </Button>
                            </CardActions>
                        </Card>
                    </Container>
                </Fade>
            </Modal>
        </>
    )
}