import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  //wrapper (main container)
  container: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
  },
  signupLink: {
    margin: theme.spacing(3, 0, 0)
  }
}));

export default function Login() {
  const classes = useStyles();
  const [textFieldState, setTextFieldState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login, signUpWithGoogle } = useContext(AuthenticationContext);

  function handleChange(event) {
    //Set the state
    setTextFieldState({ ...textFieldState, [event.target.name]: event.target.value });
  }

  function handleSignUpWithGoogle() {
    signUpWithGoogle();
    history.push('/');
  }
  async function handleLogin(event) {
    event.preventDefault();

    try {
      setLoading(true);

      //This will wait for the result and if it fails it goes to the catch
      await login(textFieldState.email, textFieldState.password);

      //Redirect to home upon sucsessfull login
      history.push('/');
    } catch (loginError) {
      enqueueSnackbar(
        loginError.message, {
        preventDuplicate: true,
      });
    }
    setLoading(false);
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.container}>

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={textFieldState.password}
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
                Login
            </Button>

              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.submit}
                onClick={handleSignUpWithGoogle}
              >
                Sign In with Google
            </Button>
            </Grid>
          </Grid>

          <Grid container item justify="center">
            <Grid item>
              <Typography className={classes.signupLink}>
                Don't have an account?<Link to='/signup'> Sign up</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}