// src/components/Profile/Profile.jsx

import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Header/Header';
import { clearLocalStorage } from '../../helpers/LocalStorage';
import Footer from '../../components/Footer/Footer';
import './Profile.css';
import iconsDoneRecipes from '../../images/iconsDoneRecipes.png';
import iconFavoriteRecipe from '../../images/iconFavoriteRecipe.png';
import iconLogout from '../../images/iconLogout.png';

function Profile() {
  const history = useHistory(); // constante necessária para
  const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage
  const email = user ? user.email : ''; // Obtém o e-mail do usuário ou uma string vazia se não estiver disponível

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div>
          {/* Exibe o e-mail do local storage */}
          <h1 data-testid="profile-email">{email}</h1>
          <p />
          <p />
          {' '}
          <button
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            <div className="icon-wrapper">
              <img src={ iconsDoneRecipes } alt="Done Recipes" className="icon" />
              <span className="button-text">Done Recipes </span>
            </div>
          </button>
          <button
            /* vai para /favorite-recipes */
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            <div className="icon-wrapper">
              <img src={ iconFavoriteRecipe } alt="Done Recipes" className="icon" />
              <span className="button-text"> Favorite Recipes</span>
            </div>
          </button>
          <button
            /* faz o logout e limpa o local storage */
            data-testid="profile-logout-btn"
            onClick={ () => {
              clearLocalStorage();
              history.push('/');
            } }
          >
            <div className="icon-wrapper">
              <img src={ iconLogout } alt="Done Recipes" className="icon" />
              <span className="button-text">Logout</span>
            </div>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
