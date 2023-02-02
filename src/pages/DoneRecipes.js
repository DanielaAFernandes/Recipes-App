import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonShare from '../components/ButtonShare';
import Header from '../components/Header';
import './DoneRecipes.style.css';

export default function DoneRecipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState(['meal', 'drink']);
  // a

  const getLocalStorage = () => {
    const doneRecipesInLocalStorage = localStorage.getItem('doneRecipes');
    const doneRecipes = doneRecipesInLocalStorage
      ? JSON.parse(doneRecipesInLocalStorage)
      : [];
    return doneRecipes;
  };

  useEffect(() => {
    setRecipes(getLocalStorage());
  }, []);

  const tagsGenerate = (tags, index) => {
    if (tags.length === 0) return '';
    if (tags.length === 1) {
      return (
        <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</p>
      );
    }
    return (
      <p>
        <span data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</span>
        <span data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{tags[1]}</span>
      </p>
    );
  };

  return (
    <div>
      <Header title="Done Recipes" showSearchIcon={ false } />
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
        {console.log(recipes)}

        {recipes.filter((recipe) => filter.includes(recipe.type)).map((recipe, i) => {
          const tags = tagsGenerate(recipe.tags, i);
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
                {tags}
                {/* <button
                type="button"
                data-testid={ `${i}-horizontal-share-btn` }
              >
                <img src={ shareButton } alt="Share" />
              </button> */}
                <ButtonShare pathname={ path } testid={ `${i}-horizontal-share-btn` } />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
