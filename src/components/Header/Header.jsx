import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  const { location } = useHistory();

  const shouldRenderSearchIcon = ![
    '/profile',
    '/done-recipes',
    '/favorite-recipes',
  ].includes(location.pathname);

  const title = () => {
    switch (location.pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return false;
    }
  };

  return (
    <div>
      <h1 data-testid="page-title">{title()}</h1>
      <Link to="/profile">
        <img src={ profileIcon } alt="icon-perfil" data-testid="profile-top-btn" />
      </Link>

      {shouldRenderSearchIcon && (
        <img src={ searchIcon } alt="icon-pesquisa" data-testid="search-top-btn" />
      )}
    </div>
  );
}

export default Header;
