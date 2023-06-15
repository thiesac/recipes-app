import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../../context/MyContext';
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
import Recomendations from './Recomendations';
import Footer from './Footer';

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
  const [MealFavorite, setMealFavorite] = useState(false);
  const MealshandleFavoritarClick = () => {
    MealshandleFavoriteRecipeClick(data);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === idDaReceita);
    setMealFavorite(isRecipeFavorite);
  };
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === idDaReceita);
    setMealFavorite(isRecipeFavorite);
  }, [MealFavorite, idDaReceita]);
  const [DrinkFavorite, setDrinkFavorite] = useState(false);
  const DrinkhandleFavoritarClick = () => {
    DrinkshandleFavoriteRecipeClick(data);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === idDaReceita);
    setDrinkFavorite(isRecipeFavorite);
  };
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === idDaReceita);
    setDrinkFavorite(isRecipeFavorite);
  }, [DrinkFavorite, idDaReceita]);
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
      <Recomendations recomend={ recomend } type={ type } />
      <Footer
        isRecipeSaved={ isRecipeSaved }
        type={ type }
        idDaReceita={ idDaReceita }
      />
    </div>
  );
}
export default RecipeDetails;
