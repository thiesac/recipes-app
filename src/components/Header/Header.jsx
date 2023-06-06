// src/components/Header/Header.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  const location = useLocation();

  const renderSearchButton = () => {
    // Verifica se a página atual é /meals ou /drinks para mostrar o ícone de pesquisa
    if (location.pathname === '/meals' || location.pathname === '/drinks') {
      return <img src={ searchIcon } alt="icon-pesquisa" data-testid="search-top-btn" />;
    }
    return null;
  };

  const renderTitle = () => {
    let title = '';

    // Define o título com base na rota atual
    switch (location.pathname) {
    case '/meals':
      title = 'Meals';
      break;
    case '/drinks':
      title = 'Drinks';
      break;
    case '/profile':
      title = 'Profile';
      break;
    case '/done-recipes':
      title = 'Done Recipes';
      break;
    case '/favorite-recipes':
      title = 'Favorite Recipes';
      break;
    default:
      title = '';
      break;
    }

    return <h1 data-testid="page-title">{title}</h1>;
  };

  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      {renderSearchButton()}
      {renderTitle()}
    </header>
  );
}

export default Header;
