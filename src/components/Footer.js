import React from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer(props) {
  const clickHandle = (id) => {
    const { history } = props;
    history.push(id);
  };

  return (
    <footer className="footer" data-testid="footer">
      <button
        type="button"
        onClick={ () => clickHandle('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          type="image/svg+xml"
          alt="Drink Icon"
        />
      </button>
      <button
        type="button"
        onClick={ () => clickHandle('/meals') }
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          type="image/svg+xml"
          alt="Meal Icon"
        />
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  history: {
    push: PropTypes.func,
  },
};

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Footer;
