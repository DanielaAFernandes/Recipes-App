import PropTypes from 'prop-types';
import React from 'react';

function Category(props) {
  const { prop1, dispatch } = props;
  return (
    <div>content</div>
  );
}

Category.propTypes = {
  prop1: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default Category;
