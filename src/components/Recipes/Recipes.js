import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';
// import { useParams } from 'react-router-dom';

function Recipes() {
  const { foodData, drinkData } = useContext(MyContext);
  console.log(drinkData);
  // useParams (type)

  // const { type } = useParams
  return (
    <section>
      {
        foodData.map(
          ({ strMealThumb, strMeal, index }) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </div>
          ),
        )
      }
      {
        drinkData.map(
          ({ strDrinkThumb, strDrink, index }) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
            </div>
          ),
        )
      }
    </section>
  );
}

export default Recipes;
