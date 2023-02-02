import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ButtonShare from '../components/ButtonShare';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritesRecipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState(['meal', 'drink']);
  const isRecipeFavorite = true;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(!favoriteRecipes ? [] : favoriteRecipes);
  }, []);

  const handleFavorite = () => {

  };

  return (
    <div>
      <Header title="Favorite Recipes" showSearchIcon={ false } />
      <p>Favorite Recipes</p>
      <div>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilter(['meal']) }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter(['drink']) }
        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter(['meal', 'drink']) }
        >
          All
        </button>
      </div>
      <div className="recipes-container">
        {recipes.filter((recipe) => filter.includes(recipe.type)).map((recipe, i) => {
          const topText = `${recipe.nationality} - ${recipe.category}`;
          const path = `/${recipe.type}s/${recipe.id}`;
          return (
            <div key={ i } style={ { width: '100px' } }>
              <button
                type="button"
                onClick={ () => history.push(path) }
              >
                <img
                  style={ { width: '100%' } }
                  src={ recipe.image }
                  alt="Imagem receita"
                  data-testid={ `${i}-horizontal-image` }
                />
                <p data-testid={ `${i}-horizontal-name` }>{recipe.name}</p>
              </button>
              <div>
                <p data-testid={ `${i}-horizontal-top-text` }>
                  {recipe.type === 'drink' ? recipe.alcoholicOrNot : topText}
                </p>
                <p data-testid={ `${i}-horizontal-done-date` }>{recipe.doneDate}</p>
                <button
                  type="button"
                  className="favorite-btn-detail"
                  onClick={ handleFavorite }
                >
                  {isRecipeFavorite ? (
                    <img
                      src={ blackHeartIcon }
                      alt="blackHeart"
                      data-testid={ `${i}-horizontal-favorite-btn` }
                    />)
                    : (
                      <img
                        src={ whiteHeartIcon }
                        alt="blackHeart"
                        data-testid={ `${i}-horizontal-favorite-btn` }
                      />)}
                </button>
                <ButtonShare pathname={ path } testid={ `${i}-horizontal-share-btn` } />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesRecipes;
