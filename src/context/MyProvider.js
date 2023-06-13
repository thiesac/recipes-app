import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [foodData, setFoodData] = useState([]); // 12 primeiras receitas de meals ou 12 primeiras receitas da categoria escolhida
  const [drinkData, setDrinkData] = useState([]); // 12 primeiras receitas de drinks ou 12 primeiras receitas da categoria escolhida
  const [categoryFoodData, setCategoryFoodData] = useState([]); // pega as 5 primeiras categorias de comida da API p/ passar pro botão
  const [categoryDrinksData, setCategoryDrinksData] = useState([]); // pega as 5 primeiras categorias de drink da API p/ passar pro botão

  // pega as 12 primeiras receitas de meals ao carregar o Recipes.js    ok
  const fetchFood12 = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const receivedData = await response.json();
    const finalIndex = 12;
    setFoodData(receivedData.meals.slice(0, finalIndex));
  }, []);

  // pega as 12 primeiras receitas de drinks ao carregar o Recipes.js     ok
  const fetchDrink12 = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const receivedData = await response.json();
    const finalIndex = 12;
    setDrinkData(receivedData.drinks.slice(0, finalIndex));
  }, []);

  // caso seja meals, carrega botão com 5 categorias de meals          ok
  const fetchFoodCategoryList = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const receivedData = await response.json();
    const finalIndex = 5;
    setCategoryFoodData(receivedData.meals.slice(0, finalIndex));
  }, []);

  // caso seja drinks, carrega botão com 5 categorias de drinks              ok
  const fetchDrinksCategoryList = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const receivedData = await response.json();
    const finalIndex = 5;
    setCategoryDrinksData(receivedData.drinks.slice(0, finalIndex));
  }, []);

  // ao clicar em um filtro de categoria de meals, exibe as 12 primeiras receitas da categoria
  const clickCategoryFilterFood = useCallback(async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const receivedData = await response.json();
    const finalIndex = 12;
    setFoodData(receivedData.meals.slice(0, finalIndex));
  }, []);

  const clickCategoryFilterDrink = useCallback(async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const receivedData = await response.json();
    const finalIndex = 12;
    setDrinkData(receivedData.drinks.slice(0, finalIndex));
  }, []);

  useEffect(() => {
    fetchFood12();
    fetchDrink12();
    fetchFoodCategoryList();
    fetchDrinksCategoryList();
  }, [fetchFood12, fetchDrink12, fetchFoodCategoryList, fetchDrinksCategoryList]);

  const values = useMemo(
    () => ({
      foodData,
      setFoodData,
      drinkData,
      setDrinkData,
      categoryFoodData,
      categoryDrinksData,
      clickCategoryFilterFood,
      clickCategoryFilterDrink,
    }),
    [foodData, drinkData, categoryFoodData,
      categoryDrinksData, clickCategoryFilterFood,
      clickCategoryFilterDrink, setDrinkData, setFoodData,
    ],
  );

  return <MyContext.Provider value={ values }>{ children }</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default MyProvider;
