import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function RecipesLink(props) {
  const { thumb, index, name, path, id } = props;
  return (
    <Link to={ `${path}/${id}` }>
      <div id="card" data-testid={ `${index}-recipe-card` }>
        <img
          src={ thumb }
          data-testid={ `${index}-card-img` }
          alt="recipe thumbnail"
        />
        <h2
          data-testid={ `${index}-card-name` }
        >
          { name }
        </h2>
      </div>
    </Link>
  );
}

RecipesLink.propTypes = {
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default RecipesLink;
