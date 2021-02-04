import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Profile from './components/Profile';
import ViewRecipe from './components/ViewRecipe';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/login' component={Login}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/view-recipe' component={ViewRecipe}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
