import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, showIcon }) {
  return (
    <header>
      <Link to="/profile">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="profileIcon"
        />
      </Link>
      {
        showIcon && (
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="searchIcon"
          />
        )
      }
      <h3 data-testid="page-title">{ title }</h3>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  showIcon: PropTypes.bool,
}.isRequired;
