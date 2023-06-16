import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MealsgetIngredientList,
  MealshandleFinishRecipeClick,
  MealshandleFavoriteRecipeClick,
  handleShareClick,
} from './MealsrecipeUtils';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/searchIcon.svg';

function MealInProgress({ id }) {
  // define o estado local onde será guardado as informações que vem da API
  const [recipeData, setRecipeData] = useState(null);

  // define o formato de como serão guardadas as informações no local storage.
  const [inProgressRecipes, setInProgressRecipes] = useState({
    drinks: {},
    meals: {},
  });

  // sempre que a ID for atualizada, será chamada a API e o estado local será aualizado com as novas informações.
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipeData(data);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchRecipeData();
  }, [id]);

  // verifica se há receitas em progresso salvas no localStorage e atualiza o estado local.
  useEffect(() => {
    const savedInProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (savedInProgressRecipes) {
      setInProgressRecipes(JSON.parse(savedInProgressRecipes));
    }
  }, []);

  // sempre que o estado local for alterado, ele tb é salvo no localStorage com as informações das receitas em progresso.
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  // faz a lista de ingredientes e medidas que será usada para gerar os checkbox
  const ingredientList = MealsgetIngredientList(recipeData);

  // define o estado local onde será guardado quais checkbox estão "checked"
  const [checkedIndices, setCheckedIndices] = useState([]);

  // ao clicar, se ficar checked é adicionado ao estado local, se ficar unchecked, será retirado e sem seguida o progresso tb é atualizado
  const handleCheckboxClick = (event, index) => {
    const updatedIndices = [...checkedIndices];

    if (event.target.checked) {
      updatedIndices.push(index);
    } else {
      const indexToRemove = updatedIndices.indexOf(index);
      updatedIndices.splice(indexToRemove, 1);
    }

    setCheckedIndices(updatedIndices);

    setInProgressRecipes((prevInProgressRecipes) => ({
      ...prevInProgressRecipes,
      meals: {
        ...prevInProgressRecipes.meals,
        [id]: updatedIndices,
      },
    }));
  };

  // atualiza os checkbox
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const savedIndices = localStorage.getItem('inProgressRecipes');
    if (savedIndices) {
      const parsedSavedIndices = JSON.parse(savedIndices);
      if (parsedSavedIndices.meals && parsedSavedIndices.meals[id]) {
        setCheckedIndices(parsedSavedIndices.meals[id]);
      }
    }
  }, [isFirstRender]);

  const isAllIngredientsChecked = checkedIndices.length === ingredientList.length;

  // adiciona a receita ao localStorage na chave de receitas feitas
  const handleFinishClick = () => {
    MealshandleFinishRecipeClick(recipeData);
  };

  // cria estado de comida favoritada ou não
  const [isFavorite, setIsFavorite] = useState(false);

  // adiciona e retira dos favoritos
  const handleFavoritarClick = () => {
    MealshandleFavoriteRecipeClick(recipeData);

    // muda o ícone favorito
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes
      .some((recipe) => recipe.id === id);

    setIsFavorite(isRecipeFavorite);
  };

  useEffect(() => {
    // muda o ícone favorito
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = favoriteRecipes
      .some((recipe) => recipe.id === id);

    setIsFavorite(isRecipeFavorite);
  }, [isFavorite]);

  // copia a url para compartilhar
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  return (
    <div>
      <p>Receita sendo feita</p>
      {recipeData?.meals && (
        <>
          <img
            src={ recipeData.meals[0].strMealThumb }
            alt="foto da receita"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{recipeData.meals[0].strMeal}</h1>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              handleShareClick(setIsLinkCopied, id);
            } }
          >
            <img src={ shareIcon } alt="icone" />
            Compartilhar
          </button>

          {isLinkCopied && (
            <p>Link copied!</p>
          )}

          <button
            type="button"
            onClick={ handleFavoritarClick }
          >
            {isFavorite ? (
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
            )}
            Favorito
          </button>

          <div data-testid="recipe-category">{recipeData.meals[0].strCategory}</div>

          <div data-testid="instructions">{recipeData.meals[0].strInstructions}</div>
          <h2>Ingredientes:</h2>
          <div>
            {ingredientList.map((item, index) => (
              <div key={ index }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  style={ {
                    textDecoration: checkedIndices.includes(index)
                      ? 'line-through solid rgb(0, 0, 0)'
                      : 'none',
                  } }
                >
                  <input
                    type="checkbox"
                    onChange={ (event) => handleCheckboxClick(event, index) }
                    data-index={ index }
                    checked={ checkedIndices.includes(index) }
                    style={ {
                      textDecoration: checkedIndices.includes(index)
                        ? 'line-through solid rgb(0, 0, 0)'
                        : 'none',
                    } }
                  />
                  <span>
                    {item.ingredient}
                    :
                    {' '}
                    {item.measure}
                  </span>
                </label>
              </div>
            ))}
          </div>
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ !isAllIngredientsChecked }
              onClick={ handleFinishClick }
            >
              Finalizar Receita
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

MealInProgress.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MealInProgress;
