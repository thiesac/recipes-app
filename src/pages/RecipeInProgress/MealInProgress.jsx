import React, { useEffect, useState } from 'react';
// import './RecipeInProgress.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';

function MealInProgress() {
  const { id } = useParams();

  const [recipeData, setRecipeData] = useState(null);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    drinks: {},
    meals: {},
  });

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

  useEffect(() => {
    const savedInProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (savedInProgressRecipes) {
      setInProgressRecipes(JSON.parse(savedInProgressRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  const measureValues = Object.keys(recipeData?.meals?.[0] || {})
    .filter((key) => key.includes('Measure'))
    .map((key) => recipeData.meals[0][key] || '');

  const ingredientList = Object.keys(recipeData?.meals?.[0] || {})
    .filter(
      (key) => key.includes('Ingredient')
        && recipeData.meals[0][key]
        && recipeData.meals[0][key] !== ' ',
    )
    .map((key, index) => ({
      ingredient: recipeData.meals[0][key],
      measure: measureValues[index],
    }));

  const [checkedIndices, setCheckedIndices] = useState([]);

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

  useEffect(() => {
    const savedIndices = localStorage.getItem('inProgressRecipes');
    if (savedIndices) {
      const parsedSavedIndices = JSON.parse(savedIndices);
      if (parsedSavedIndices.meals && parsedSavedIndices.meals[id]) {
        setCheckedIndices(parsedSavedIndices.meals[id]);
      }
    }
  }, [id]);

  const isAllIngredientsChecked = checkedIndices.length === ingredientList.length;

  const history = useHistory();

  const handleFinishRecipeClick = () => {
    const {
      idMeal,
      strCategory,
      strMeal,
      strMealThumb,
      strTags,
    } = recipeData.meals[0];

    const recipe = {
      id: idMeal,
      type: 'meal',
      nationality: '',
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: new Date().toISOString(),
      tags: strTags ? strTags.split(',') : [],
    };

    const doneRecipes = localStorage.getItem('doneRecipes');
    let updatedDoneRecipes = [];

    if (doneRecipes) {
      updatedDoneRecipes = JSON.parse(doneRecipes);
    }

    updatedDoneRecipes.push(recipe);
    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));

    history.push('/done-recipes');
  };

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
          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>

          {/* {recipeData.meals[0].strCategory && (
            <div data-testid="recipe-category">{recipeData.meals[0].strCategory}</div>
          )} */}

          <div data-testid="instructions">{recipeData.meals[0].strInstructions}</div>
          <h2>Ingredientes:</h2>
          <div>
            {ingredientList.map((item, index) => (
              <div key={ index }>
                <label
                  data-testid="ingredient-step"
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
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !isAllIngredientsChecked }
            onClick={ handleFinishRecipeClick }
          >
            Finalizar Receita
          </button>
        </>
      )}
    </div>
  );
}

export default MealInProgress;
