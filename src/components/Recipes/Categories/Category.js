import PropTypes from 'prop-types';
import React from 'react';

function Category(props) {
  const { getLinksFromCategory, name } = props;
  return (
    <button
      data-testid={ `${name}-category-filter` }
      type="button"
      onClick={ () => getLinksFromCategory(name) }
    >
      { name }
    </button>
  );
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  getLinksFromCategory: PropTypes.func.isRequired,
};
export default Category;
