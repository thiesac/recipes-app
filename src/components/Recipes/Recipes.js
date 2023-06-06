import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';
// import { useParams } from 'react-router-dom';

function Recipes() {
  const { foodData, drinkData } = useContext(MyContext);
  console.log(foodData);

  const showFood = () => foodData.map(
    ({ strMealThumb, strMeal, index }) => (
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
  console.log(foodData);
  const showDrinks = () => drinkData.map(
    ({ strDrinkThumb, strDrink, index }) => (
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

  // const { type } = useParams
  return (
    <section>
      {showFood()}
      {showDrinks()}
    </section>
  );
}

export default Recipes;
