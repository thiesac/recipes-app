import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import './Carousel.css';
import './RecipeDetails.css';

const six = 6;
function RecipeDetails() {
  const { catchMealIdRecipes,
    catchDrinkIdRecipes, drinkData,
    foodData,
  } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [recomend, setRecomend] = useState([]);
  const { 0: type, idDaReceita } = useParams();

  useEffect(() => {
    const getDataDetails = async () => {
      if (type === 'meals') {
        const dataAPi = await catchMealIdRecipes(idDaReceita);
        setData(dataAPi);
      } if (type === 'drinks') {
        const dataAPi = await catchDrinkIdRecipes(idDaReceita);
        setData(dataAPi);
      }
    };
    const getRecommendations = async () => {
      if (type === 'meals') {
        const dataRecomend = await drinkData;
        setRecomend(dataRecomend);
      } if (type === 'drinks') {
        const dataRecomend = await foodData;
        setRecomend(dataRecomend);
      }
    };
    getDataDetails();
    getRecommendations();
  }, [catchDrinkIdRecipes, catchMealIdRecipes, idDaReceita,
    type, setData, drinkData, foodData]);
  console.log(type, recomend.slice(0, six));
  return (
    <div>
      {type === 'meals' && data.meals && data.meals.map((element, index) => {
        const ingredients = Object.entries(element)
          .filter(([key, value]) => key
            .startsWith('strIngredient')
          && value !== '' && value !== null)
          .map((entry) => entry[1]);
        const measure = Object.entries(element)
          .filter(([key, value]) => key
            .startsWith('strMeasure')
          && value !== '' && value !== null)
          .map((entry) => entry[1]);
        return (
          <div key={ index }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{element.strMeal}</h1>
            <p data-testid="recipe-category">{element.strCategory}</p>
            {ingredients.map((e, i) => (
              <div key={ i }>
                <p data-testid={ `${i}-ingredient-name-and-measure` }>
                  {e}
                </p>
                <p data-testid={ `${i}-ingredient-name-and-measure` }>
                  {measure[i]}
                </p>
              </div>
            ))}
            {element.strYoutube !== null && (
              <iframe
                width="560"
                height="315"
                src={ element.strYoutube }
                allow="accelerometer; autoplay; encrypted-media;
          gyroscope; picture-in-picture"
                allowFullScreen
                title={ element.strMeal }
                data-testid="video"
              />
            )}
            <p data-testid="instructions">{element.strInstructions}</p>
          </div>
        );
      })}
      {type === 'drinks' && data.drinks && data.drinks.map((element, index) => {
        const ingredients = Object.entries(element)
          .filter(([key, value]) => key
            .startsWith('strIngredient' || 'strMeasure1')
            && value !== '' && value !== null)
          .map((entry) => entry[1]);
        const measure = Object.entries(element)
          .filter(([key, value]) => key
            .startsWith('strMeasure')
          && value !== '' && value !== null)
          .map((entry) => entry[1]);
        return (
          <div key={ index }>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{element.strDrink}</h1>
            <p data-testid="recipe-category">
              {element.strAlcoholic === null ? element.strCategory : element.strAlcoholic}
            </p>
            {ingredients.map((e, i) => (
              <div key={ i }>
                <p
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {e}
                </p>
                <p data-testid={ `${i}-ingredient-name-and-measure` }>
                  {measure[i]}
                </p>
              </div>
            ))}
            <p data-testid="instructions">{element.strInstructions}</p>
          </div>
        );
      })}
      <div className="carousel-recomend">
        {recomend
        && recomend.slice(0, six).map((item, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ index }
            className="carousel-item-recomend"
          >
            <img
              src={ type === 'drinks' ? item.strMealThumb : item.strDrinkThumb }
              alt={ type === 'drinks' ? 'drink' : 'meal' }
            />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              { type === 'drinks' ? item.strMeal : item.strDrink }
            </p>
          </div>
        ))}
      </div>
      <footer>
        <button
          data-testid="start-recipe-btn"
          className="button-recipe-details"
        >
          Start Recipe
        </button>
      </footer>

    </div>

  );
}
export default RecipeDetails;
