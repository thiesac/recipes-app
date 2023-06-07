import React from 'react';
import Header from '../Header/Header';

function Profile() {
  return (
    <div>
      <Header />
      <p>Profile</p>
      {/*       Conteúdo da página */}
      <div>
        <h1 data-testid="profile-email">example@example.com</h1>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
