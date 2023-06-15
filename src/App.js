// src/App.js

import React from 'react';
/* import './App.css'; */
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';
import Profile from './pages/Profile/Profile';
import Drinks from './pages/Drinks/Drinks';
import Meals from './pages/Meals/Meals';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress/RecipeInProgress';
import Login from './pages/Login/Login';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

function App() {
  return (
    <div className="meals">
      <MyProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route
            path="/(meals|drinks)/:idDaReceita"
            component={ RecipeDetails }
          />
          <Route
            exact
            path="/meals/:idDaReceita/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            exact
            path="/drinks/:idDaReceita/in-progress"
            component={ RecipeInProgress }
          />
        </Switch>
      </MyProvider>
    </div>
  );
}

export default App;
