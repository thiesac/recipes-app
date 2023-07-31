import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { callMealsRecipe, callDrinksRecipe } from '../../services/eatApi';
import MyContext from '../../context/MyContext';

function SearchBar() {
  const { setFoodData, setDrinkData } = useContext(MyContext);
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  const onSearchClick = async () => {
    if (searchType === 'first-letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (history.location.pathname === '/meals') {
      const eatenApiMeal = await callMealsRecipe(searchInput, searchType);
      setFoodData(eatenApiMeal);
      if (!eatenApiMeal || eatenApiMeal.length === 0) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }

      const finalIndex = 12; // define o índice final que será utilizado no slice. No caso, 12 primeiros elementos do array 'eatenApiMeal'
      const slicedMealData = eatenApiMeal.slice(0, finalIndex);

      setFoodData(slicedMealData);

      if (eatenApiMeal.length === 1) {
        history.push(`/meals/${eatenApiMeal[0].idMeal}`);
      }
    }
    if (history.location.pathname === '/drinks') {
      const eatenApiDrink = await callDrinksRecipe(searchInput, searchType);
      setDrinkData(eatenApiDrink);
      if (!eatenApiDrink || eatenApiDrink.length === 0) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }

      const finalIndex = 12;
      const slicedDrinkData = eatenApiDrink.slice(0, finalIndex);

      setDrinkData(slicedDrinkData);

      if (eatenApiDrink.length === 1) {
        history.push(`/drinks/${eatenApiDrink[0].idDrink}`);
      }
    }
  };

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        name={ searchInput }
        placeholder="Search Recipe"
        onChange={ ({ target: { value } }) => setSearchInput(value) }
      />
      <div>
        <label>
          <input
            type="radio"
            name={ searchType }
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          Ingredients
        </label>
        <label>
          <input
            type="radio"
            name={ searchType }
            data-testid="name-search-radio"
            value="name"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name={ searchType }
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ onSearchClick } // Ao clicar, executará as condições da função 'onSearchClick'
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
