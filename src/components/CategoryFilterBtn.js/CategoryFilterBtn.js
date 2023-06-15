// src/components/CategoryFilterBtn.js/CategoryFilterBtn.js

import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../../context/MyContext';

function CategoryFilterBtn({ type }) {
  const {
    categoryFoodData,
    categoryDrinksData,
    setDrinkData,
    clickCategoryFilterFood,
    clickCategoryFilterDrink,
    setFoodData,
  } = useContext(MyContext);
  const [selectedFoodCategory, setSelectedFoodCategory] = useState('');
  const [selectedDrinkCategory, setSelectedDrinkCategory] = useState('');

  // na rota /meals, ao clicar no botão ALL, traz as 12 receitas sem filtro ('limpa filtros')
  // Carrega todas as receitas de meals sem filtro
  const btnAllFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const receivedData = await response.json();
    const finalIndex = 12;
    setSelectedFoodCategory('');
    // adicionado verificação se receivedData.meals e nulo ou não pois estava dando erro no browser
    setFoodData(receivedData.meals?.slice(0, finalIndex) || []);
  };

  // na rota /drinks, ao clicar no botão ALL, traz os 12 drinks sem filtro ('limpa filtros')
  // Carrega todas as receitas de drinks sem filtro
  const btnAllDrinks = async () => {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    const receivedData = await response.json();
    const finalIndex = 12;
    setSelectedDrinkCategory('');
    // adicionado verificação se receivedData.meals e nulo ou não pois estava dando erro no browser
    setDrinkData(receivedData.drinks?.slice(0, finalIndex) || []);
  };

  // Trata o clique em uma categoria de meals
  const handleCategoryClickFood = (category) => {
    if (selectedFoodCategory === category) {
      // Se a mesma categoria for clicada novamente, exibe todas as receitas sem filtro
      if (type === 'meals') {
        btnAllFood();
      }
    } else {
      // Caso contrário, define a categoria selecionada e aciona a função clickCategoryFilterFood
      setSelectedFoodCategory(category);
      clickCategoryFilterFood(category);
    }
  };

  // Trata o clique em uma categoria de drinks
  const handleCategoryClickDrink = (category) => {
    if (selectedDrinkCategory === category) {
      // Se a mesma categoria for clicada novamente, exibe todas as receitas sem filtro
      if (type === 'drinks') {
        btnAllDrinks();
      }
    } else {
      // Caso contrário, define a categoria selecionada e aciona a função clickCategoryFilterDrink
      setSelectedDrinkCategory(category);
      clickCategoryFilterDrink(category);
    }
  };

  // ao entrar na rota /meals, página carrega 5 botões para pesquisa por categoria
  const btnMeals = () => categoryFoodData.map(({ strCategory }) => (
    <div key={ strCategory }>
      <button
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => handleCategoryClickFood(strCategory) }
        // se a categoria selecionada for igual a categoria do botão, adiciona a classe active
        className={ selectedFoodCategory === strCategory ? 'active' : '' }
      >
        {strCategory}
      </button>
    </div>
  ));

  // ao entrar na rota /drinks, página carrega 5 botões para pesquisa por categoria
  const btnDrinks = () => categoryDrinksData.map(({ strCategory }) => (
    <div key={ strCategory }>
      <button
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => handleCategoryClickDrink(strCategory) }
        // se a categoria selecionada for igual a categoria do botão, adiciona a classe active
        className={ selectedDrinkCategory === strCategory ? 'active' : '' }
      >
        {strCategory}
      </button>
    </div>
  ));

  // Trata o clique no botão "All" ele tem que ser seoaradi das categorias
  const handleAllClick = () => {
    if (type === 'meals') {
      btnAllFood();
    } else if (type === 'drinks') {
      btnAllDrinks();
    }
  };

  if (type === 'meals') {
    return (
      <>
        <button
          data-testid="All-category-filter"
          onClick={ handleAllClick }
          className={ selectedFoodCategory === '' ? 'active' : '' }
        >
          All
        </button>
        {btnMeals()}
      </>
    );
  }

  return (
    <>
      <button
        data-testid="All-category-filter"
        onClick={ handleAllClick }
        className={ selectedDrinkCategory === '' ? 'active' : '' }
      >
        All
      </button>
      {btnDrinks()}
    </>
  );
}

CategoryFilterBtn.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default CategoryFilterBtn;
