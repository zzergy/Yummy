import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import ViewRecipe from './components/ViewRecipe';
import './App.css';
import 'fontsource-roboto';
import AuthenticationProvider from './context/AuthenticationContext';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
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
            </Switch>
          </AuthenticationProvider>
        </SnackbarProvider>
      </Router>
    </div>
  );
}

export default App;
