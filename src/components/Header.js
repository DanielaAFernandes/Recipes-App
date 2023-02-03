import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import LinkContext from '../context/linkContext/LinkContext';

export default function Header({ title, showIcon }) {
  const { setIsSearchBarToogle, isSearchBarToogled } = useContext(LinkContext);
  return (
    <header>
      <h3 data-testid="page-title">{ title }</h3>
      <div
        className="icons-holder"
      >

        <Link to="/profile">
          <button
            className="button"
          >
            <img
              className="icon-images"
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="profileIcon"
            />

          </button>
        </Link>
        {
          showIcon && (
            <button
              className="search button"
              type="button"
              onClick={ () => setIsSearchBarToogle(!isSearchBarToogled) }
            >
              <img
                className="icon-images"
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="searchIcon"
              />
            </button>
          )
        }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  showIcon: PropTypes.bool,
}.isRequired;
