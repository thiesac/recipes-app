
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';



function MyProvider({ children }) {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);

  const fetchFood = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const receivedData = await response.json();
    const finalIndex = 12;
    setFoodData(receivedData.meals.slice(0, finalIndex));
  }, []);

  const fetchDrink = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const receivedData = await response.json();
    const finalIndex = 12;
    setDrinkData(receivedData.drinks.slice(0, finalIndex));
  }, []);

  useEffect(() => {
    fetchFood();
    fetchDrink();
  }, [fetchFood, fetchDrink]);

  const values = useMemo(() => ({
    foodData, setFoodData, drinkData, setDrinkData,
  }), [foodData, drinkData]);

  return (
    <MyContext.Provider value={ values }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default MyProvider;

