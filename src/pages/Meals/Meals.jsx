// src/pages/Meals/Meals.jsx

import React from 'react';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import CategoryFilterBtn from '../../components/CategoryFilterBtn.js/CategoryFilterBtn';

function Meals() {
  return (
    <div>
      <Header />
      <CategoryFilterBtn type="meals" />
      <Recipes type="meals" />
    </div>
  );
}

export default Meals;
