// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

function FavoriteButton() {
  // const { prop1, dispatch } = props;
  return (
    <Link to="/none">
      <button
        type="button"
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="share"
        />
      </button>
    </Link>
  );
}

FavoriteButton.propTypes = {
};
export default connect(mapStateToProps)(FavoriteButton);
