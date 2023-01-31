// import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton() {
  // const { prop1, dispatch } = props;
  return (
    // <Link to="/none">
    <button
      type="button"
      data-testid="favorite-btn"
    >
      <img
        src={ whiteHeartIcon }
        alt="share"
      />
    </button>
    // </Link> a
  );
}

FavoriteButton.propTypes = {
};
export default FavoriteButton;
