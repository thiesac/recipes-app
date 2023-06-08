// src/App.js

import React from 'react';
/* import './App.css'; */
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
/* import rockGlass from './images/rockGlass.svg'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';
import Profile from './pages/Profile/Profile';
import Drinks from './pages/Drinks/Drinks';
import Meals from './pages/Meals/Meals';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="meals">
      <MyProvider>
        {/*         <span className="logo">TRYBE</span>
        <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
          Glass
        </object> */}
        <Switch>
          {/* rotas */}
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id-da-receita" component="" />
          <Route exact path="/drinks/:id-da-receita" component="" />
          <Route exact path="/meals/:id-da-receita/in-proress" component="" />
          <Route exact path="/drinks/:id-da-receita/in-progress" component="" />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </MyProvider>
    </div>
  );
}

export default App;
