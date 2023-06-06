import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../../context/MyContext';

function CategoryFilterBtn({ type }) {
  const { categoryFoodData, categoryDrinksData } = useContext(MyContext);

  const btnMeals = () => categoryFoodData.map(({ strCategory, categoryName }) => (
    <div key={ strCategory }>
      <button data-testid={ `${categoryName}-category-filter` }>{ strCategory }</button>
    </div>
  ));

  const btnDrinks = () => categoryDrinksData.map(({ strCategory, categoryName }) => (
    <div key={ strCategory }>
      <button data-testid={ `${categoryName}-category-filter` }>{ strCategory }</button>
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
