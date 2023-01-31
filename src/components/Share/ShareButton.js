// import PropTypes from 'prop-types';
import React from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function ShareButton() {
  // const { prop1, dispatch } = props;
  return (
    <button
      data-testid="favorite-btn"
      type="button"
    >
      <img
        src={ whiteHeartIcon }
        alt="favoritar"
      />
    </button>
  );
}

// ShareButton.propTypes = {
//   prop1: PropTypes.string.isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

export default ShareButton;
