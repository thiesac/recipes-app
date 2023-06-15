// shareUtils.js
import copy from 'clipboard-copy';

export const handleShareClick = (setIsLinkCopied, id) => {
  const recipeLink = `http://localhost:3000/meals/${id}`; // arrumar o endereço...................
  copy(recipeLink)
    .then(() => {
      setIsLinkCopied(true);
    })
    .catch((error) => {
      console.error('Failed to copy recipe link:', error);
    });
};

export function getMeasureValues(recipeData) {
  return Object.keys(recipeData?.meals?.[0] || {})
    .filter((key) => key.includes('Measure'))
    .map((key) => recipeData.meals[0][key] || '');
}

export function MealsgetIngredientList(recipeData) {
  const measureValues = getMeasureValues(recipeData);

  return Object.keys(recipeData?.meals?.[0] || {})
    .filter(
      (key) => key.includes('Ingredient')
          && recipeData.meals[0][key]
          && recipeData.meals[0][key] !== ' ',
    )
    .map((key, index) => ({
      ingredient: recipeData.meals[0][key],
      measure: measureValues[index],
    }));
}

export function MealshandleFinishRecipeClick(recipeData) {
  const {
    idMeal,
    strCategory,
    strArea,
    strMeal,
    strMealThumb,
    strTags,
  } = recipeData.meals[0];

  const recipe = {
    id: idMeal,
    type: 'meal',
    nationality: strArea,
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
}

export function MealshandleFavoriteRecipeClick(recipeData) {
  const {
    idMeal,
    strCategory,
    strArea,
    strMeal,
    strMealThumb,
  } = recipeData.meals[0];

  const recipe = {
    id: idMeal,
    type: 'meal',
    nationality: strArea,
    category: strCategory || '',
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  let updatedFavoriteRecipes = [];

  if (favoriteRecipes) {
    const notFound = -1;

    updatedFavoriteRecipes = JSON.parse(favoriteRecipes);

    const recipeIndex = updatedFavoriteRecipes
      .findIndex((recipe2) => recipe2.id === idMeal);

    if (recipeIndex !== notFound) {
      // Remove a receita do array de receitas favoritas
      updatedFavoriteRecipes.splice(recipeIndex, 1);
    } else {
      // Adiciona a receita ao array de receitas favoritas
      updatedFavoriteRecipes.push(recipe);
    }
  } else {
    updatedFavoriteRecipes.push(recipe);
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
}
