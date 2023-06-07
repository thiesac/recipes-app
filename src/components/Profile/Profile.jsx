// src/components/Profile/Profile.jsx

import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Header/Header';
import { clearLocalStorage } from '../../helpers/LocalStorage';
import Footer from '../Footer/Footer';

function Profile() {
  const history = useHistory(); // constante necessária para
  const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage
  const email = user ? user.email : ''; // Obtém o e-mail do usuário ou uma string vazia se não estiver disponível

  return (
    <div>
      <Header />
      <p>Profile</p>
      <div>
        {/* Exibe o e-mail do local storage */}
        <h1 data-testid="profile-email">{email}</h1>
        {' '}
        <button
          /*     vai para /done-recipes */
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          /* vai para /favorite-recipes */
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          /* faz o logout e limpa o local storage */
          data-testid="profile-logout-btn"
          onClick={ () => {
            clearLocalStorage();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
