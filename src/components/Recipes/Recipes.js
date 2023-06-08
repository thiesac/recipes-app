import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../../context/MyContext';

function Recipes({ type }) {
  const { foodData, drinkData } = useContext(MyContext);

  // ao entrar na rota /meals, carrega as 12 primeiras receitas OU carrega as 12 primeiras da categoria OU carrega pesquisa do SearchBar
  const showFood = () => foodData.map(
    ({ strMealThumb, strMeal }, index) => (
      <div
        data-testid={ `${index}-recipe-card` }
        key={ strMealThumb }
      >
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
      </div>
    ),
  );

  // ao entrar na rota /drinks, carrega ss 12 primeiras bebidas OU carrega os 12 primeiros da categoria escolhida OU carrega pesquisa do SearchBar
  const showDrinks = () => drinkData.map(
    ({ strDrinkThumb, strDrink }, index) => (
      <div
        data-testid={ `${index}-recipe-card` }
        key={ strDrinkThumb }
      >
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
      </div>
    ),
  );

  if (type === 'meals') {
    return (
      <>
        { showFood() }
      </>
    );
  }
  if (type === 'drinks') {
    return (
      <>
        { showDrinks() }
      </>
    );
  }
}

Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Recipes;
