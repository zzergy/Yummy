import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  makeStyles,
  Fade,
  IconButton
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { useSnackbar } from 'notistack';
import background from "../img/1.jpg"
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = makeStyles((theme) => ({
  backgroudDiv: {
    backgroundImage: `url(${background})`,
    height: '100vh',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  container: {
    paddingTop: theme.spacing(25),
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
    margin: theme.spacing(2, 0, 0),
  },
  signupLink: {
    margin: theme.spacing(2, 0, 0)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  resetPasswordButton: {
    display: "flex",
    justifyContent: "center",
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login, signUpWithGoogle, resetPassword } = useContext(AuthenticationContext);
  
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
        variant: "error"
      });
    }
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
        variant: "error"
      });
    }
    setLoading(false);
  }

  // ---------------- Reset Password ---------------- 

  const handleOpenPopup = () => {
    setOpen(true);
  }

  const handleLCosePopup = () => {
    setTextFieldState({...textFieldState, email: ""});
    setOpen(false);
  }

  const handleResetPassword = (event) => {
    event.preventDefault();
    const resetPasswordPromise = resetPassword(textFieldState.email);
    resetPasswordPromise.then(() => {
      enqueueSnackbar(
        "An email has been sent to your inbox. Please check your spam too.", {
        preventDuplicate: true,
        variant: "success"
      });
      setOpen(false);
    }).catch((error) => {
      enqueueSnackbar(
        error.message, {
        preventDuplicate: true,
        variant: "error"
      });
    })
  }

  const modalContent = (
    <Fade in={open}>
      <Container maxWidth="sm">
        <Card component="form" onSubmit={handleResetPassword}>
          <CardHeader
            className={classes.cardHeader}
            title={<Typography variant="h5">Password reset</Typography>}
            action={<IconButton aria-label="close" onClick={handleLCosePopup}>
              <CloseRoundedIcon />
            </IconButton>}
            subheader={<Typography variant="caption" color="textSecondary">Please note that the password reset does not work for users registered with Google.</Typography>}
          >
          </CardHeader>
          <CardContent>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              onChange={handleChange}
              value={textFieldState.email}
            />
          </CardContent>
          <CardActions className={classes.resetPasswordButton}>
            <Button
              style={{ minWidth: 400, maxWidth: 400, marginBottom: 10 }}
              type="submit"
              variant="outlined"
              color="secondary"
            >
              Send pasword reset email
          </Button>
          </CardActions>
        </Card>
      </Container>
    </Fade>
  )
  //------------------------------------------------

  return (
    <div className={classes.backgroudDiv}>
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
          </form>

          <Grid container item justify="center">
            <Grid item>
              <Typography className={classes.signupLink}>
                Don't have an account?<Link to='/signup'> Sign up</Link>
              </Typography>
            </Grid>

            <Grid item>
              <Typography className={classes.signupLink}>
                Forgot your password?<Link to='#' onClick={handleOpenPopup}> Reset password</Link>
              </Typography>

              <Modal
                open={open}
                className={classes.modal}
                closeAfterTransition
              >
                {modalContent}
              </Modal>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}