import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MealInProgress from './MealInProgress';
import DrinkInProgress from './DrinkInProgress';

function RecipeInProgress() {
  const { idDaReceita } = useParams();
  const location = useLocation();
  const { pathname } = location;

  console.log(idDaReceita);
  return (
    <div>
      { pathname.includes('/meals/') && <MealInProgress id={ idDaReceita } /> }
      { pathname.includes('/drinks/') && <DrinkInProgress id={ idDaReceita } /> }
    </div>
  );
}

export default RecipeInProgress;
