import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MealInProgress from './MealInProgress';
import DrinkInProgress from './DrinkInProgress';

function RecipeInProgress() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          component={ MealInProgress }
        />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          component={ DrinkInProgress }
        />

      </Switch>
    </div>
  );
}

export default RecipeInProgress;
