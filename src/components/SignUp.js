import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { useSnackbar } from 'notistack';
import background from "../img/1.jpg"

const useStyles = makeStyles((theme) => ({
  backgroundDiv: {
    backgroundImage: `url(${background})`,
    height: '100vh',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  container: {
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  textFields: {
    background: "#faf8fb"
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  signupLink: {
    margin: theme.spacing(3, 0, 0)
  }
}));



export default function SignUp() {
  const classes = useStyles();
  const [textFieldState, setTextFieldState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });



  const [error, setError] = useState({ didError: false, message: '' });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const history = useHistory();
  const { signUp, signUpWithGoogle } = useContext(AuthenticationContext);

  function handleChange(event) {
    //Set the state
    setTextFieldState({ ...textFieldState, [event.target.name]: event.target.value });
  }

  async function handleSignUpWithGoogle() {
    try {
      await signUpWithGoogle();
      history.push('/');
    } catch (loginError) {
      enqueueSnackbar(
        loginError.message, {
        preventDuplicate: true,
      });
    }
  }

  //Sign up with Email and password
  async function handleSubmit(event) {
    event.preventDefault();

    //Dismiss action for snackbar
    const action = key => (
      <Button onClick={() => { closeSnackbar(key) }} color='secondary'>
        Dismiss
      </Button>
    );

    //Check if the passwords match
    if (textFieldState.password !== textFieldState.confirmPassword) {
      return setError({ ...error, didError: true, message: 'Passwords must match' })
    } else {
      setError({ ...error, didError: false, message: '' })
    }

    //SignUp
    try {
      setError({ ...error, message: '' });
      setLoading(true);

      //This will wait for the result and if it fails it goes to the catch
      await signUp(textFieldState.email, textFieldState.password, textFieldState.username);

      //Redirect to login upon sucsessfull registration
      history.push('/login');
    } catch (signUpError) {
      enqueueSnackbar(
        signUpError.message, {
        preventDuplicate: true,
        persist: true,
        action
      });
    }
    setLoading(false);
  }

  return (
    <div className={classes.backgroundDiv}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.container}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
        </Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {error.message.length !== 0 && <span>{error.message}</span>}
              <Grid item xs={12}>
                <TextField
                  className={classes.textFields}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  onChange={handleChange}
                  value={textFieldState.username}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textFields}
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={textFieldState.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textFields}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  error={error.didError}
                  helperText={error.message}
                  value={textFieldState.password}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textFields}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange}
                  error={error.didError}
                  helperText={error.message}
                  value={textFieldState.confirmPassword}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loading}
                >
                  Sign Up
              </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleSignUpWithGoogle}
                >
                  Sign Up with Google
              </Button>
              </Grid>

            </Grid>

            <Grid container justify="center">
              <Grid item>
                <Typography className={classes.signupLink}>
                  Already have an account?<Link to='/login'> Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>

  );
}