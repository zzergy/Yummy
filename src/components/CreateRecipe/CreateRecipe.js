import { Button, Container, Grid } from '@material-ui/core';
import React, { useState, useContext, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import "firebase/storage"
import "firebase/database";
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom'
import NavigationBar from '../NavigationBar/NavigationBar';

export default function CreateRecipe() {
    const { currentUser } = useContext(AuthenticationContext);
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingreedientsList: '',
        cookingInstructions: '',
        likes: []
    });
    const [fileData, setFileData] = useState();

    const history = useHistory();

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
            if (fileData) {
                //------------- Upload the files to the storage -------------
                const storageRef = firebase.storage().ref(`${currentUser.uid}/${formData.title}`);
                const fileRef = storageRef.child(fileData.name);
                const fileUploadTask = fileRef.put(fileData);
                fileUploadTask.then(() => {
                    return firebase.storage().ref().child(`${currentUser.uid}/${formData.title}/${fileData.name}`).getDownloadURL();
                }).then((url) => {
                    //------------- DB -------------
                    const db = firebase.database().ref("recipes");

                    //Submit the form data to the DB
                    return db.push({
                        ...formData,
                        date: currentDate(),
                        authorPhotoURL: currentUser.photoURL,
                        authorDisplayName: currentUser.displayName,
                        authorUid: currentUser.uid,
                        imageUrl: url
                    })
                }).then(() => {
                    history.push('/profile');

                    enqueueSnackbar(
                        "Publish successful!", {
                        preventDuplicate: true,
                        variant: "success"
                    });
                }).catch((error) => {
                    enqueueSnackbar(
                        error.message, {
                        preventDuplicate: true,
                        variant: "info"
                    });
                });
            };

        } else {
            enqueueSnackbar(
                "Please login to your account", {
                preventDuplicate: true,
                variant: "info"
            });
        }



    }

    return (
        <>
            <NavigationBar />
            <Container component="form" onSubmit={handleSubmit}>
                <CssBaseline />
                <Grid container spacing={2}>
                    {/* Title */}
                    <Grid item xs={12} style={{ margin: 15 }}>
                        <Typography component='h1' variant='h5'>
                            Create a new Recipe
                        </Typography>
                    </Grid>
                    {/* Dish info */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
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
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Dish Description"
                                    multiline
                                    rowsMax={15}
                                    rows={10}
                                    onChange={handleChange}
                                    value={formData.description}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="ingreedientsList"
                                    name="ingreedientsList"
                                    label="Ingreedients List"
                                    multiline
                                    rowsMax={10}
                                    rows={10}
                                    onChange={handleChange}
                                    value={formData.ingreedientsList}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="cookingInstructions"
                                    name="cookingInstructions"
                                    label="Cooking instructions"
                                    multiline
                                    rowsMax={10}
                                    rows={10}
                                    onChange={handleChange}
                                    value={formData.cookingInstructions}
                                />
                            </Grid>
                            <Grid item>
                                <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileUploadData} />
                                <Button onClick={triggerFileUpload}>Upload Image</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Submit Button  */}
                    <Grid item container xs={12}>
                        <Button
                            style={{ marginBottom: 5 }}
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                        >
                            Publish Recipe
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}