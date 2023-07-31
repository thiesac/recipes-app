// src/pages/FavoriteRecipes/FavoriteRecipes.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import unFav from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [currFilterFav, setFilterFav] = useState(favoriteRecipes);

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    Swal.fire('Link copied!');
  };

  const clickToUnfavorite = (id) => {
    const updatedRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
    setFilterFav(updatedRecipes);
  };

  // Function to handle filtering by type
  const handleFilterByType = (type) => {
    if (type === 'all') {
      setFilterFav(favoriteRecipes);
    } else {
      setFilterFav(favoriteRecipes.filter((recipe) => recipe.type === type));
    }
  };

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterByType('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterByType('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterByType('drink') }
      >
        Drinks
      </button>
      { currFilterFav && currFilterFav.length > 0 ? (
        currFilterFav
          .map(({
            id, type, nationality, category, alcoholicOrNot, name, image,
          }, index) => (
            <Card key={ index }>
              <Link to={ `/${type}s/${id}` }>
                <Card.Img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <Card.Title>{ name }</Card.Title>
              </Link>
              { type === 'meal' ? (
                <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
                  { `${nationality} - ${category}` }
                </Card.Subtitle>
              ) : (
                <Card.Subtitle>{ alcoholicOrNot }</Card.Subtitle>
              ) }
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copyToClipboard(`http://localhost:3000/${type}s/${id}`) }
              >
                <img src={ shareIcon } alt="Share button" />
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => clickToUnfavorite(id) }
              >
                <img src={ unFav } alt="unfavorite" />
              </button>
            </Card>
          ))
      ) : (
        <p>No favorite recipes found.</p>
      ) }
    </div>
  );
}

export default FavoriteRecipes;
