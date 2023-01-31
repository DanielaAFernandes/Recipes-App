import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" showSearch={ false } />
      <div>
        <h4 data-testid="profile-email">
          {JSON.parse(localStorage.getItem('user')).email}
        </h4>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
