import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  const goToDrinks = () => {
    history.push('/drinks');
  };

  const goToMeals = () => {
    history.push('/meals');
  };

  const showDrinksBtn = () => (
    <button
      onClick={ goToDrinks }
    >
      <img
        src={ drinkIcon }
        alt="drinks"
        data-testid="drinks-bottom-btn"
      />
    </button>
  );

  const showMealsBtn = () => (
    <button
      onClick={ goToMeals }
    >
      <img
        src={ mealIcon }
        alt="meals"
        data-testid="meals-bottom-btn"
      />
    </button>
  );

  return (
    <footer data-testid="footer" className="footer">
      { showDrinksBtn() }
      { showMealsBtn() }
    </footer>
  );
}

export default Footer;
