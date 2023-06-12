// src/pages/DoneRecipes/DoneRecipes.jsx
import React, { useState, useHistory } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [currFilter, setFilter] = useState('');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const history = useHistory();
  const { pathname, search } = history.location;
  const initialURL = `${pathname}${search}`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      Swal.fire('Link copied!');
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const drinkCard = (drink, index) => {
    const { strDrinkThumb, strDrink, doneDate, strAlcoholic, idDrink } = drink;
    const detailsLink = `${initialURL}/drinks/${idDrink}`;
    return (
      <div>
        <Link to={ `/drinks/${idDrink}` }>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-name` }>{ strDrink }</p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        <p data-testid={ `${index}-horizontal-top-text` }>{ strAlcoholic }</p>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyToClipboard(detailsLink) }
        >
          <img src={ shareIcon } alt="Share button" />
        </button>
      </div>
    );
  };

  const foodCard = (food, index) => {
    const { strMealThumb, strMeal, doneDate, strArea, strCategory, strTags,
      idMeal,
    } = food;
    const tags = strTags.split(',');
    const detailsLink = `${initialURL}/drinks/${idMeal}`;
    return (
      <div>
        <Link to={ `/drinks/${idMeal}` }>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-name` }>{ strMeal }</p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${strArea} - ${strCategory}` }
        </p>
        <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
          { `${tags[0]} ${tags.length > 1 ? tags[1] : ''}` }
        </p>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyToClipboard(detailsLink) }
        >
          <img src={ shareIcon } alt="Share button" />
        </button>
      </div>
    );
  };

  const showRecipes = () => {
    if (!currFilter) {
      return doneRecipes.map((recipe, i) => (
        recipe.idDrink ? drinkCard(recipe, i) : foodCard(recipe, i)
      ));
    } if (currFilter === 'meals') {
      return doneRecipes.map((recipe, i) => foodCard(recipe, i));
    } if (currFilter === 'drinks') {
      return doneRecipes.map((recipe, i) => drinkCard(recipe, i));
    }
  };

  return (
    <div>
      <Header />
      <p>Done Recipes</p>
      <button
        data-testid="filter-by-all-btn"
        onClick={ (e) => setFilter(e.target.value) }
        value="all"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ (e) => setFilter(e.target.value) }
        value="meals"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ (e) => setFilter(e.target.value) }
        value="drinks"
      >
        Drinks
      </button>
      { () => showRecipes() }
    </div>
  );
}

export default DoneRecipes;
