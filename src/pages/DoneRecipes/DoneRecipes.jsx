// to be fixed
import React from 'react';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import Header from '../../components/Header/Header';
// import shareIcon from '../../images/shareIcon.svg';
// import './DoneRecipes.css';

function DoneRecipes() {
  // const [currFilter, setFilter] = useState('');

  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  // const copyToClipboard = async (text) => {
  //   await navigator.clipboard.writeText(text);
  //   Swal.fire('Link copied!');
  // };

  // const drinkCard = (drink, index) => {
  //   const { image, name, doneDate, alcoholicOrNot, id } = drink;
  //   const detailsLink = `http://localhost:3000/drinks/${id}`;
  //   return (
  //     <div>

  //       <Link to={ `drinks/${id}` }>
  //         <img
  //           src={ image }
  //           alt={ name }
  //           data-testid={ `${index}-horizontal-image` }
  //         />
  //         <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
  //       </Link>
  //       <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
  //       <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
  //       <button
  //         data-testid={ `${index}-horizontal-share-btn` }
  //         onClick={ () => copyToClipboard(detailsLink) }
  //         src={ shareIcon }
  //       >
  //         Share
  //       </button>
  //     </div>
  //   );
  // };

  // const foodCard = (food, index) => {
  //   const { image, name, doneDate, nationality, category, tags,
  //     id,
  //   } = food;
  //   const detailsLink = `http://localhost:3000/meals/${id}`;
  //   return (
  //     <div>
  //       <Link to={ `meals/${id}` }>
  //         <img
  //           src={ image }
  //           alt={ name }
  //           data-testid={ `${index}-horizontal-image` }
  //           className="mealImage"
  //         />
  //         <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
  //       </Link>
  //       <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
  //       <p data-testid={ `${index}-horizontal-top-text` }>
  //         {`${nationality} - ${category}`}
  //       </p>
  //       {tags.map((tag) => (
  //         <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
  //           {tag}
  //         </p>
  //       ))}
  //       <button
  //         data-testid={ `${index}-horizontal-share-btn` }
  //         onClick={ () => copyToClipboard(detailsLink) }
  //         src={ shareIcon }
  //       >
  //         Share
  //       </button>
  //     </div>
  //   );
  // };

  // const showRecipes = () => {
  //   if (!doneRecipes) {
  //     return <p>Nenhuma receita feita</p>; // caso não exista receita feita
  //   }

  //   if (!currFilter) {
  //     return doneRecipes.map((recipe, i) => (
  //       recipe.type === 'drink' ? drinkCard(recipe, i) : foodCard(recipe, i)
  //     ));
  //   } if (currFilter === 'meals') {
  //     return doneRecipes
  //       .filter(({ type }) => type === 'meal')
  //       .map((recipe, i) => foodCard(recipe, i));
  //   }
  //   return doneRecipes
  //     .filter(({ type }) => type === 'drink')
  //     .map((recipe, i) => drinkCard(recipe, i));
  // };

  return (
    <h2>Sorry, the chef is still cooking this recipe</h2>
    // <div>
    //   <Header />
    //   <p>Done Recipes</p>
    //   <button
    //     data-testid="filter-by-all-btn"
    //     onClick={ () => setFilter('') }
    //     value="all"
    //   >
    //     All
    //   </button>
    //   <button
    //     data-testid="filter-by-meal-btn"
    //     onClick={ (e) => setFilter(e.target.value) }
    //     value="meals"
    //   >
    //     Meals
    //   </button>
    //   <button
    //     data-testid="filter-by-drink-btn"
    //     onClick={ (e) => setFilter(e.target.value) }
    //     value="drinks"
    //   >
    //     Drinks
    //   </button>
    //   {showRecipes()}
    // </div>
  );
}

export default DoneRecipes;
