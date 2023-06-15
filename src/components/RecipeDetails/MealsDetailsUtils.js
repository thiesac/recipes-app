import copy from 'clipboard-copy';

export const MealshandleShareClick = (setIsLinkCopied, id) => {
  const recipeLink = `http://localhost:3000/meals/${id}`; // arrumar o endereço...................
  copy(recipeLink)
    .then(() => {
      setIsLinkCopied(true);
    })
    .catch((error) => {
      console.error('Failed to copy recipe link:', error);
    });
};

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
