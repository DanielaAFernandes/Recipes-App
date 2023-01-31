import PropTypes from 'prop-types';
import React from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import CopyConfirmation from './CopyConfirmation';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function ShareButton() {
  const {
    setShowCopyFn,
    show,
  } = props;

  return (
    <>
      { show && <CopyConfirmation /> }
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ setShowCopyFn }
      >
        <img
          src={ whiteHeartIcon }
          alt="favoritar"
        />
      </button>
    </>
  );
}

ShareButton.propTypes = {
  setShowCopyFn: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ShareButton;
