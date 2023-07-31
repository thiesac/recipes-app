import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, Card } from 'react-bootstrap';
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
import shareIcon from '../../images/shareIcon.svg';
import Recomendations from './Recomendations';
import FooterDetails from './FooterDetails';

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
    <div className="d-flex flex-column align-items-center justify-content-center">
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
          <Card key={ index } style={ { width: '20rem' } }>
            <Card.Img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid="recipe-photo"
            />
            <Card.Title data-testid="recipe-title">{ element.strMeal }</Card.Title>
            <Card.Body>
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
            </Card.Body>
            <ListGroup>
              <ListGroup.Item data-testid="recipe-category">
                { element.strCategory }
              </ListGroup.Item>
              { ingredients.map((e, i) => (
                <div key={ i }>
                  <ListGroup.Item>
                    { `${e} - ${measure[i]}` }
                  </ListGroup.Item>
                </div>
              )) }
            </ListGroup>
            <Card.Body data-testid="instructions">{ element.strInstructions }</Card.Body>
          </Card>
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
          <Card key={ index } style={ { width: '20rem' } }>
            <Card.Img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid="recipe-photo"
            />
            <Card.Title data-testid="recipe-title">{ element.strDrink }</Card.Title>
            <Card.Body>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => {
                  DrinkshandleShareClick(setIsLinkCopied, idDaReceita);
                } }
              >
                <img src={ shareIcon } alt="icone" />
                Share
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
                Favorite
              </button>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item data-testid="recipe-category">
                { element.strAlcoholic === null ? element
                  .strCategory : element.strAlcoholic }
              </ListGroup.Item>
              { ingredients.map((e, i) => (
                <div key={ i }>
                  <ListGroup.Item
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    { `${e} - ${measure[i]}` }
                  </ListGroup.Item>
                </div>
              )) }
              <Card.Body data-testid="instructions">
                { element.strInstructions }
              </Card.Body>
            </ListGroup>
          </Card>
        );
      }) }
      <Recomendations recomend={ recomend } type={ type } />
      <FooterDetails
        isRecipeSaved={ isRecipeSaved }
        type={ type }
        idDaReceita={ idDaReceita }
      />
    </div>
  );
}
export default RecipeDetails;
