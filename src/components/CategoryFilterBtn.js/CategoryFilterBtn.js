import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../../context/MyContext';

function CategoryFilterBtn({ type }) {
  const {
    categoryFoodData, categoryDrinksData,
    clickCategoryFilterFood, clickCategoryFilterDrink,
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

  if (type === 'meals') {
    return (
      <>
        { btnMeals() }
      </>
    );
  }
  if (type === 'drinks') {
    return (
      <>
        { btnDrinks() }
      </>
    );
  }
}

CategoryFilterBtn.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default CategoryFilterBtn;
