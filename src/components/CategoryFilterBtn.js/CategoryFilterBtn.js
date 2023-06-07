import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../../context/MyContext';

function CategoryFilterBtn({ type }) {
  const {
    categoryFoodData, categoryDrinksData, clickCategoryFilterFood,
  } = useContext(MyContext);

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

  const btnDrinks = () => categoryDrinksData.map(({ strCategory }) => (
    <div key={ strCategory }>
      <button data-testid={ `${strCategory}-category-filter` }>{ strCategory }</button>
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
