import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import './Carousel.css';
import './RecipeDetails.css';
import {
  MealshandleShareClick,
  MealshandleFavoriteRecipeClick,
} from './MealsDetailsUtils';
import {
  DrinkshandleShareClick,
  DrinkshandleFavoriteRecipeClick,
} from './DrinksDetails';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/searchIcon.svg';

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
  // console.log(type, recomend.slice(0, six));

  const checkRecipeInProgress = () => {
    const recipesInLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (recipesInLocalStorage) {
      if (recipesInLocalStorage.meals && recipesInLocalStorage.meals[idDaReceita]) {
        return true;
      }
      return recipesInLocalStorage.drinks && recipesInLocalStorage.drinks[idDaReceita];
    }
  };
  const isRecipeSaved = checkRecipeInProgress();

  // cria estado de comida favoritada ou não........ .............
  const [MealFavorite, setMealFavorite] = useState(false);

  // adiciona e retira dos favoritos MEALS
  const MealshandleFavoritarClick = () => {
    MealshandleFavoriteRecipeClick(data);

    // muda o ícone favorito
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === idDaReceita);

    setMealFavorite(isRecipeFavorite);
  };

  useEffect(() => {
    // muda o ícone favorito
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === idDaReceita);

    setMealFavorite(isRecipeFavorite);
  }, [MealFavorite]);

  // adiciona e retira dos favoritos drinks ..............................
  const [DrinkFavorite, setDrinkFavorite] = useState(false);

  const DrinkhandleFavoritarClick = () => {
    DrinkshandleFavoriteRecipeClick(data);

    // muda o ícone favorito
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === idDaReceita);

    setDrinkFavorite(isRecipeFavorite);
  };

  useEffect(() => {
    // muda o ícone favorito
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === idDaReceita);

    setDrinkFavorite(isRecipeFavorite);
  }, [DrinkFavorite]);

  // copia a url para compartilhar..................................
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  return (
    <div>
      { type === 'meals' && data.meals && data.meals.map((element, index) => {
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
            <h1 data-testid="recipe-title">{ element.strMeal }</h1>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => {
                MealshandleShareClick(setIsLinkCopied, idDaReceita);
              } }
            >
              <img src={ shareIcon } alt="icone" />
              Compartilhar
            </button>

            { isLinkCopied && (
              <p>Link copied!</p>
            ) }

            <button
              type="button"
              onClick={ MealshandleFavoritarClick }
            >
              { MealFavorite ? (
                <img
                  src={ blackHeartIcon }
                  alt="Favorito"
                  data-testid="favorite-btn"
                />
              ) : (
                <img
                  src={ whiteHeartIcon }
                  alt="Não favorito"
                  data-testid="favorite-btn"
                />
              ) }
              Favorito
            </button>
            <p data-testid="recipe-category">{ element.strCategory }</p>
            { ingredients.map((e, i) => (
              <div key={ i }>
                <p data-testid={ `${i}-ingredient-name-and-measure` }>
                  { e }
                </p>
                <p data-testid={ `${i}-ingredient-name-and-measure` }>
                  { measure[i] }
                </p>
              </div>
            )) }
            { element.strYoutube !== null && (
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
            ) }
            <p data-testid="instructions">{ element.strInstructions }</p>
          </div>
        );
      }) }
      { type === 'drinks' && data.drinks && data.drinks.map((element, index) => {
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
            <h1 data-testid="recipe-title">{ element.strDrink }</h1>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => {
                DrinkshandleShareClick(setIsLinkCopied, idDaReceita);
              } }
            >
              <img src={ shareIcon } alt="icone" />
              Compartilhar
            </button>
            { isLinkCopied && (
              <p>Link copied!</p>
            ) }
            <button
              type="button"
              onClick={ DrinkhandleFavoritarClick }
            >
              { DrinkFavorite ? (
                <img
                  src={ blackHeartIcon }
                  alt="Favorito"
                  data-testid="favorite-btn"
                />
              ) : (
                <img
                  src={ whiteHeartIcon }
                  alt="Não favorito"
                  data-testid="favorite-btn"
                />
              ) }
              Favorito
            </button>
            <p data-testid="recipe-category">
              { element.strAlcoholic === null ? element
                .strCategory : element.strAlcoholic }
            </p>
            { ingredients.map((e, i) => (
              <div key={ i }>
                <p
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  { e }
                </p>
                <p data-testid={ `${i}-ingredient-name-and-measure` }>
                  { measure[i] }
                </p>
              </div>
            )) }
            <p data-testid="instructions">{ element.strInstructions }</p>
          </div>
        );
      }) }
      <div className="carousel-recomend">
        { recomend
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
          )) }
      </div>
      <footer>
        {
          isRecipeSaved ? (
            <button
              data-testid="start-recipe-btn"
              className="button-recipe-details"
            >
              Continue Recipe
            </button>
          ) : (
            <button
              data-testid="start-recipe-btn"
              className="button-recipe-details"
            >
              Start Recipe
            </button>
          )
        }
      </footer>
    </div>

  );
}
export default RecipeDetails;
