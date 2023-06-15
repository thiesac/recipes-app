import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MealInProgress from './MealInProgress';
import DrinkInProgress from './DrinkInProgress';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      {pathname.includes('/meals/') && <MealInProgress id={ id } />}
      {pathname.includes('/drinks/') && <DrinkInProgress id={ id } />}
    </div>
  );
}

export default RecipeInProgress;
