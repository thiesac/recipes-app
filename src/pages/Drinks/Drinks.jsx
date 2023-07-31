// src/pages/Drinks/Drinks.jsx

import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import CategoryFilterBtn from '../../components/CategoryFilterBtn.js/CategoryFilterBtn';

function Drinks() {
  return (
    <div>
      <Header />
      <CategoryFilterBtn type="drinks" />
      <Recipes type="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
