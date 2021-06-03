import {
    Button,
    Container,
    Grid,
    Typography,
    TextField,
    makeStyles
} from '@material-ui/core';
import React, { useState, useContext, useRef } from 'react';
import firebase from 'firebase/app';
import "firebase/storage"
import "firebase/database";
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom'
import NavigationBar from '../NavigationBar/NavigationBar';
import LoadingScreen from '../LoadingScreen';
import background from "../../img/2.jpg";

const useStyles = makeStyles(theme => ({
    root: {
        background: `url(${background}) no-repeat center center fixed`,
        backgroundSize: "cover",
        minHeight: '100vh'
    },
    textFields: {
        background: "#faf8fb"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between"
    }
}))

export default function CreateRecipe() {
    const { currentUser } = useContext(AuthenticationContext);
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        title: '',
        ingreedientsList: '',
        cookingInstructions: '',
        likes: []
    });
    const [fileData, setFileData] = useState();
    const [toggleLoadingScreen, setToggleLoadingScreen] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    function currentDate() {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const newDate = new Date();
        let date = newDate.getDate();
        let year = newDate.getFullYear();
        return `${months[newDate.getMonth()]} ${date}, ${year}`
    }

    const inputRef = useRef();
    function triggerFileUpload() {
        inputRef.current.click();
    }

    function handleFileUploadData(event) {
        if (event.target.files[0]) {
            setFileData(event.target.files[0]);
        }
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (currentUser) {
            //------------- DB -------------
            const db = firebase.database().ref("recipes");

            //trigger loading screen
            setToggleLoadingScreen(true);

            //Submit the form data to the DB
            return db.push({
                ...formData,
                date: currentDate(),
                authorPhotoURL: currentUser.photoURL,
                authorDisplayName: currentUser.displayName,
                authorUid: currentUser.uid,
                likes: [],
                savedBy: []
            }).then((savedRecipeRef) => {
                if (fileData) {
                    //------------- Upload the files to the storage -------------
                    const storageRef = firebase.storage().ref(`${currentUser.uid}/${savedRecipeRef.key}`);
                    const fileRef = storageRef.child(fileData.name);
                    const fileUploadPromise = fileRef.put(fileData);

                    //You handle that promsise here
                    return fileUploadPromise.then(() => {
                        const fileURLPromise = firebase.storage().ref(`${currentUser.uid}/${savedRecipeRef.key}/${fileData.name}`).getDownloadURL();
                        return fileURLPromise;
                    }).then((url) => {
                        return savedRecipeRef.update({
                            imageUrl: url
                        });
                    });
                } else {
                    return Promise.resolve();
                }
            }).then(() => {
                setTimeout(() => {
                    setToggleLoadingScreen(false);
                    history.push('/profile');
                    setToggleLoadingScreen(false);

                    enqueueSnackbar(
                        "Publish successful!", {
                        preventDuplicate: true,
                        variant: "success"
                    });
                }, 1000)
            }).catch((error) => {
                setToggleLoadingScreen(false);

                enqueueSnackbar(
                    error.message, {
                    preventDuplicate: true,
                    variant: "info"
                });
            });
        }
    }

    return (
        <div className={classes.root}>
            {toggleLoadingScreen ? <LoadingScreen toggle={toggleLoadingScreen} /> : ""}
            <NavigationBar />
            <Container component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Title */}
                    <Grid item xs={12} style={{ marginTop: 10 }}>
                        <Typography component='h1' variant='h5'>
                            Create a new Recipe
                        </Typography>
                    </Grid>
                    {/* Dish info */}
                    <Grid item container xs={12} md={6} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textFields}
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                name="title"
                                label="Title"
                                onChange={handleChange}
                                value={formData.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textFields}
                                variant="outlined"
                                fullWidth
                                id="ingreedientsList"
                                name="ingreedientsList"
                                label="Ingreedients List"
                                multiline
                                required
                                rowsMax={10}
                                rows={10}
                                onChange={handleChange}
                                value={formData.ingreedientsList}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.textFields}
                                variant="outlined"
                                fullWidth
                                id="cookingInstructions"
                                name="cookingInstructions"
                                label="Cooking instructions"
                                multiline
                                required
                                rowsMax={18}
                                rows={18}
                                onChange={handleChange}
                                value={formData.cookingInstructions}
                            />
                        </Grid>

                        <Grid item container justify="flex-end">
                            <Grid item>
                                <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileUploadData} />
                                <Button
                                    onClick={triggerFileUpload}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Upload Cover Image
                                </Button>
                                <Button
                                    style={{ marginLeft: 10 }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Publish Recipe
                                    </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}