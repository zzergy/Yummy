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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [textFieldState, setTextFieldState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({ didError: false, message: '' });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login } = useContext(AuthenticationContext);

  function handleChange(event) {
    //Set the state
    setTextFieldState({ ...textFieldState, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    //SignUp
    try {
      setError({ ...error, message: '' });
      setLoading(true);

      //This will wait for the result and if it fails it goes to the catch
      await login(textFieldState.email, textFieldState.password);

      //Redirect to home upon sucsessfull login
      history.push('/');
    } catch {
      setError({ ...error, didError: true, message: 'Failed to Login' });
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

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {error.message.length !== 0 && <span>{error.message}</span>}
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
                error={error.didError}
                helperText={error.message}
                value={textFieldState.password}
              />
            </Grid>
          </Grid>

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

          <Grid container justify="center">
            <Grid item>
              Don't have an account?<Link to='/signup'> Sign up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}