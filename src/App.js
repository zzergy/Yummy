import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile/Profile';
import ViewRecipe from './components/ViewRecipe';
import 'fontsource-roboto';
import AuthenticationProvider from './context/AuthenticationContext';
import { SnackbarProvider } from 'notistack';
import CreateRecipe from './components/CreateRecipe';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import indigo from "@material-ui/core/colors/indigo";
import PrivateRoute from './components/PrivateRoute';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[200],
      main: indigo[400],
      dark: indigo[500],
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Router>
        <SnackbarProvider maxSnack={3}>
          <AuthenticationProvider>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={Login} />
              <PrivateRoute path='/profile' component={Profile} />
              <Route path='/view-recipe/:recipeId' component={ViewRecipe} />
              <PrivateRoute path='/new-recipe' component={CreateRecipe} />
            </Switch>
          </AuthenticationProvider>
        </SnackbarProvider>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
