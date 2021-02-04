import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import ViewRecipe from './components/ViewRecipe';
import './App.css';
import 'fontsource-roboto';


function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/signin' component={SignUp}/>
            <Route path='/login' component={Login}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/view-recipe' component={ViewRecipe}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
