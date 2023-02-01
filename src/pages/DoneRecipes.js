import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [recipes, setRecipes] = useState(null);
  const [alertCopy, setAlertCopy] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  const handlerClickFavorite = async (mealsOrDrink, id) => {
    if (mealsOrDrink === 'meal') await copy(`http://localhost:3000/meals/${id}`);
    if (mealsOrDrink === 'drink') await copy(`http://localhost:3000/drinks/${id}`);
    setAlertCopy(true);
  };

  const handlerMeal = () => {
    const base = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(base.filter((e) => e.type === 'meal'));
  };

  const handlerDrink = () => {
    const base = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(base.filter((e) => e.type === 'drink'));
  };

  const handlerAll = () => {
    setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  return (
    <div>
      <Header />
      <button
        onClick={ handlerAll }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ handlerMeal }
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        onClick={ handlerDrink }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {alertCopy && <p>Link copied!</p>}
      {recipes && recipes.map((e, i) => (
        <div key={ e.id }>
          <Link
            to={ `/${e.type}s/${e.id}` }
          >
            <img
              style={ { width: '200px', height: '200px' } }
              data-testid={ `${i}-horizontal-image` }
              src={ e.image }
              alt="imageRecipe"
            />
          </Link>
          <Link
            to={ `/${e.type}s/${e.id}` }
          >
            <h3 data-testid={ `${i}-horizontal-name` }>{ e.name }</h3>
          </Link>
          <h4 data-testid={ `${i}-horizontal-top-text` }>
            { e.type === 'meal' ? `${e.nationality} - ${e.category}` : e.alcoholicOrNot }
          </h4>
          <p data-testid={ `${i}-horizontal-done-date` }>{ e.doneDate }</p>
          <button
            onClick={ () => handlerClickFavorite(e.type, e.id) }
            src={ shareIcon }
            data-testid={ `${i}-horizontal-share-btn` }
            type="button"
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          {e.tags.length > 0 && e.tags.map((t) => (
            <p key={ t } data-testid={ `${i}-${t}-horizontal-tag` }>{ t }</p>))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
