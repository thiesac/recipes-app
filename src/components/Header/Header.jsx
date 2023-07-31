// src/components/Header/Header.jsx

import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, NavItem } from 'react-bootstrap';
import iconProfile from '../../images/iconProfile.png';
import iconSearch from '../../images/iconSearch.png';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header() {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
    case '/meals':
      return 'MEALS';
    case '/drinks':
      return 'DRINKS';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const renderContent = () => {
    if (searchVisible) {
      return (
        <div className="SearchBar">
          <SearchBar
            type="text"
            placeholder="Buscar"
            data-testid="search-input"
            style={ { color: '#7F00FF', textAlign: 'center' } }
          />
        </div>
      );
    }

    return <h1 data-testid="page-title">{getPageTitle()}</h1>;
  };

  return (
    <Navbar bg="warning">
      <Container>
        <NavLink to="/profile">
          <img src={ iconProfile } alt="Profile" data-testid="profile-top-btn" />
        </NavLink>
        <div className="search-container">
          <NavItem>
            <img
              src={ iconSearch }
              alt="icon-pesquisa"
              data-testid="search-top-btn"
              type="button"
              onClick={ handleSearchClick }
            />
          </NavItem>
        </div>
        <Navbar.Text className="white-text">
          {renderContent()}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Header;
