// src/pages/DoneRecipes/DoneRecipes.jsx

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [currFilter, setFilter] = useState('');
  /*
  localStorage.setItem('doneRecipes', JSON.stringify([{
    id: 'id-da-eceita',
    type: 'meal',
    nationality: 'nacionalidade',
    category: 'categoria',
    alcoholicOrNot: 'alcoholic',
    name: 'nome',
    image: 'imagem',
    doneDate: 'quando',
    tags: ['tag1', 'tag2'],
  }]));
  // const history = useHistory();
  // const { pathname, search } = history.location;
  // const initialURL = `${pathname}${search}`;
*/

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      Swal.fire('Link copied!');
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const drinkCard = (drink, index) => {
    const { image, name, doneDate, alcoholicOrNot, id } = drink;
    const detailsLink = `/drinks/${id}`;
    return (
      <div>
        <Link to={ `/drinks/${id}` }>
          <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyToClipboard(detailsLink) }
          src={ shareIcon }
        >
          Share
        </button>
      </div>
    );
  };

  const foodCard = (food, index) => {
    const { image, name, doneDate, nationality, category, tags, id } = food;
    const detailsLink = `/drinks/${id}`;
    return (
      <div>
        <Link to={ `/drinks/${id}` }>
          <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${nationality} - ${category}`}
        </p>
        {tags.map((tag) => (
          <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
            {tag}
          </p>
        ))}
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyToClipboard(detailsLink) }
          src={ shareIcon }
        >
          Share
        </button>
      </div>
    );
  };

  const showRecipes = () => {
    if (!doneRecipes) {
      return <p>Nenhuma receita feita</p>; // caso não exista receita feita
    }

    if (!currFilter) {
      return doneRecipes.map((recipe, i) => (recipe.type
        // eslint
        === 'drink'
        ? drinkCard(recipe, i)
        : foodCard(recipe, i)));
    }
    if (currFilter === 'meals') {
      return doneRecipes.map((recipe, i) => foodCard(recipe, i));
    }
    if (currFilter === 'drinks') {
      return doneRecipes.map((recipe, i) => drinkCard(recipe, i));
    }

    return null;
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
      {showRecipes()}
    </div>
  );
}

export default DoneRecipes;
// abrindo PR
