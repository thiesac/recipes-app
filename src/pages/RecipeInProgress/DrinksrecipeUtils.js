import copy from 'clipboard-copy';

export const handleShareClick = (setIsLinkCopied, id) => {
  const recipeLink = `http://localhost:3000/drinks/${id}`; // arrumar o endereço...................
  copy(recipeLink)
    .then(() => {
      setIsLinkCopied(true);
    })
    .catch((error) => {
      console.error('Failed to copy recipe link:', error);
    });
};

export function getMeasureValues(recipeData) {
  return Object.keys(recipeData?.drinks?.[0] || {})
    .filter((key) => key.includes('Measure'))
    .map((key) => recipeData.drinks[0][key] || '');
}

export function DrinksgetIngredientList(recipeData) {
  const measureValues = getMeasureValues(recipeData);

  return Object.keys(recipeData?.drinks?.[0] || {})
    .filter(
      (key) => key.includes('Ingredient')
            && recipeData.drinks[0][key]
            && recipeData.drinks[0][key] !== ' ',
    )
    .map((key, index) => ({
      ingredient: recipeData.drinks[0][key],
      measure: measureValues[index],
    }));
}

export function DrinkshandleFinishRecipeClick(recipeData) {
  const {
    idDrink,
    strCategory,
    strAlcoholic,
    strDrink,
    strDrinkThumb,
    strTags,
  } = recipeData.drinks[0];

  const recipe = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
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

  // history.push('/done-recipes');
}

export function DrinkshandleFavoriteRecipeClick(recipeData) {
  const {
    idDrink,
    strCategory,
    strAlcoholic,
    strDrink,
    strDrinkThumb,
  } = recipeData.drinks[0];

  const recipe = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  let updatedFavoriteRecipes = [];
  const notFound = -1;

  if (favoriteRecipes) {
    updatedFavoriteRecipes = JSON.parse(favoriteRecipes);

    const recipeIndex = updatedFavoriteRecipes
      .findIndex((recipe2) => recipe2.id === idDrink);
    const recipeNotFound = recipeIndex === notFound;

    if (recipeNotFound) {
      // Adiciona a receita ao array de receitas favoritas
      updatedFavoriteRecipes.push(recipe);
    } else {
      // Remove a receita do array de receitas favoritas
      updatedFavoriteRecipes.splice(recipeIndex, 1);
    }
  } else {
    updatedFavoriteRecipes.push(recipe);
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
}
