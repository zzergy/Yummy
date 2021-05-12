import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile/Profile';
import ViewRecipe from './components/ViewRecipe';
import 'fontsource-roboto';
import AuthenticationProvider from './context/AuthenticationContext';
import { SnackbarProvider } from 'notistack';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2c8c99"
    },
    secondary: {
      main: "#E73645"
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
              <Route path='/profile' component={Profile} />
              <Route path='/view-recipe' component={ViewRecipe} />
              <Route path='/new-recipe' component={CreateRecipe} />
            </Switch>
          </AuthenticationProvider>
        </SnackbarProvider>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
