export const callMealsRecipe = async (searchInput, searchType) => {
  if (searchType === 'ingredient') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    const data = await response.json();
    return data.meals || []; // Retorna um array vazio se for nulo;
  }
  if (searchType === 'name') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();
    return data.meals || []; // Retorna um array vazio se for nulo;
  }
  if (searchType === 'first-letter') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
    const data = await response.json();
    return data.meals || []; // Retorna um array vazio se for nulo;
  }
};

export const callDrinksRecipe = async (searchInput, searchType) => {
  if (searchType === 'ingredient') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    const data = await response.json();
    return data.drinks || []; // Retorna um array vazio se for nulo;
  }
  if (searchType === 'name') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();
    return data.drinks || []; // Retorna um array vazio se for nulo;
  }
  if (searchType === 'first-letter') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
    const data = await response.json();
    return data.drinks || []; // Retorna um array vazio se for nulo;
  }
};
