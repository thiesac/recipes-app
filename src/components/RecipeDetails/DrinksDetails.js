import copy from 'clipboard-copy';

export const DrinkshandleShareClick = (setIsLinkCopied, id) => {
  const recipeLink = `http://localhost:3000/drinks/${id}`; // arrumar o endereço...................
  copy(recipeLink)
    .then(() => {
      setIsLinkCopied(true);
    })
    .catch((error) => {
      console.error('Failed to copy recipe link:', error);
    });
};

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
