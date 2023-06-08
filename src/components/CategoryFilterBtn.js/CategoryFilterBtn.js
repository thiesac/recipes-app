import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../../context/MyContext';

function CategoryFilterBtn({ type }) {
  const {
    categoryFoodData, categoryDrinksData, setDrinkData,
    clickCategoryFilterFood, clickCategoryFilterDrink, setFoodData,
  } = useContext(MyContext);

  // ao entrar na rota /meals, página carrega 5 botões para pesquisa por categoria
  const btnMeals = () => categoryFoodData.map(({ strCategory }) => (
    <div key={ strCategory }>
      <button
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => clickCategoryFilterFood(strCategory) }
      >
        { strCategory }
      </button>
    </div>
  ));

  // ao entrar na rota /drinks, página carrega 5 botões para pesquisa por categoria
  const btnDrinks = () => categoryDrinksData.map(({ strCategory }) => (
    <div key={ strCategory }>
      <button
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => clickCategoryFilterDrink(strCategory) }
      >
        { strCategory }
      </button>
    </div>
  ));

  // na rota /meals, ao clicar no botão ALL, traz as 12 receitas sem filtro ('limpa filtros')
  const btnAllFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const receivedData = await response.json();
    const finalIndex = 12;
    setFoodData(receivedData.meals.slice(0, finalIndex));
  };

  // na rota /drinks, ao clicar no botão ALL, traz os 12 drinks sem filtro ('limpa filtros')
  const btnAllDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const receivedData = await response.json();
    const finalIndex = 12;
    setDrinkData(receivedData.drinks.slice(0, finalIndex));
  };

  if (type === 'meals') {
    return (
      <>
        <button
          data-testid="All-category-filter"
          onClick={ () => btnAllFood() }
        >
          All
        </button>
        { btnMeals() }
      </>
    );
  }
  if (type === 'drinks') {
    return (
      <>
        <button
          data-testid="All-category-filter"
          onClick={ () => btnAllDrinks() }
        >
          All
        </button>
        { btnDrinks() }
      </>
    );
  }
}

CategoryFilterBtn.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default CategoryFilterBtn;
