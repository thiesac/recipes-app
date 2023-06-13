// src/pages/FavoriteRecipes/FavoriteRecipes.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';

function FavoriteRecipes() {
  // const [currFilterFav, setFilterFav] = useState('');
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')); // vem do requisito 34

  // const copyToClipboard = async (text) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     Swal.fire('Link copied!');
  //   } catch (error) {
  //     console.error('Failed to copy text:', error);
  //   }
  // };

  const clickToUnfavorite = (id) => localStorage.setItem(favoriteRecipes
    .filter((recipe) => recipe.id !== id), JSON.stringify(favoriteRecipes));

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ (e) => setFilterFav(console.log(e.target.value)) }
        value="all"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ (e) => setFilterFav(e.target.value) }
        value="meals"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ (e) => setFilterFav(e.target.value) }
        value="drinks"
      >
        Drinks
      </button>
      {
        favoriteRecipes.map(
          ({ id, type, nationality, category, alcoholicOrNot, name, image }, index) => (
            <section key={ index }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <span data-testid={ `${index}-horizontal-name` }>{ name }</span>
              {
              if (type === 'meal') {
                
              }
              }
            </section>
          ))
      }
    </div>
  );
}

export default FavoriteRecipes;

// [{
//   id: id - da - receita,
//   type: meal - ou - drink,
//   nationality: nacionalidade - da - receita - ou - texto - vazio,
//   category: categoria - da - receita - ou - texto - vazio,
//   alcoholicOrNot: alcoholic - ou - non - alcoholic - ou - texto - vazio,
//   name: nome - da - receita,
//   image: imagem - da - receita
// }]
