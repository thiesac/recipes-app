// src/pages/Drinks.jsx

import React from 'react';
import Header from '../../components/Header/Header';
import CategoryFilterBtn from '../../components/CategoryFilterBtn.js/CategoryFilterBtn';
import Recipes from '../../components/Recipes/Recipes';

function Drinks() {
  return (
    <div>
      <Header />
      <CategoryFilterBtn type="drinks" />
      <Recipes type="drinks" />
    </div>
  );
}

export default Drinks;
