import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [categoryFoodData, setCategoryFoodData] = useState([]);
  const [categoryDrinksData, setCategoryDrinksData] = useState([]);

  // pega as 12 primeiras receitas de meals ao carregar o Recipes.js
  const fetchFood12 = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const receivedData = await response.json();
    const finalIndex = 12;
    setFoodData(receivedData.meals.slice(0, finalIndex));
  }, []);

  // pega as 12 primeiras receitas de drinks ao carregar o Recipes.js
  const fetchDrink12 = useCallback(async () => {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    const receivedData = await response.json();
    const finalIndex = 12;
    setDrinkData(receivedData.drinks.slice(0, finalIndex));
  }, []);

  // caso seja meals, carrega botão com 5 categorias de meals
  const fetchFoodCategoryList = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const receivedData = await response.json();
    const finalIndex = 5;
    setCategoryFoodData(receivedData.meals.slice(0, finalIndex));
  }, []);

  // caso seja drinks, carrega botão com 5 categorias de meals
  const fetchDrinksCategoryList = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const receivedData = await response.json();
    const finalIndex = 5;
    setCategoryDrinksData(receivedData.drinks.slice(0, finalIndex));
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
    }),

    [foodData, drinkData, categoryFoodData,
      categoryDrinksData, setDrinkData, setFoodData],

  );

  return <MyContext.Provider value={ values }>{children}</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default MyProvider;
