import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  // clickHandle = (id) => {
  //   const { history } = props;
  //   history.push(id);
  // };

  return (
    <footer data-testid="footer">
      <button
        type="button"
        // onClick={ () => clickHandle('/drinks') }
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
        // onClick={ () => clickHandle('/meals') }
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

Footer.propTypes = {};

export default Footer;
