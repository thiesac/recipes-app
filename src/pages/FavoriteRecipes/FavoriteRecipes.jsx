// src/pages/FavoriteRecipes/FavoriteRecipes.jsx

import React from 'react';
import Header from '../../components/Header/Header';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')); // vem do requisito 34

  return (
    <div>
      <Header />
      {
        favoriteRecipes.map(
          (
            { id, type, nationality, category, alcoholicOrNot, name, image },
          ) => (
            <section key={ id }>
              <img src={ image } alt="name" />
              <p>{ name }</p>
              { (
                type === 'meal'
                && <span>{`${category} ${nationality}` }</span>
              ) }
              { (
                type === 'drink'
                && <p>{ alcoholicOrNot }</p>
              ) }
              <button>Compartilhar</button>
              <button>Desfavoritar</button>
            </section>
          ),
        )
      }
      <p>Favorite Recipes</p>
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
