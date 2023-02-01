import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const { recipeObject, type } = props;
  const [isFavorite, setIsFavorite] = useState();
  const LOCAL_STORAGE_FAVORITE_RECIPES = 'favoriteRecipes';

  const variableName = type === 'drink' ? 'Drink' : 'Meal';

  const getLocalStorage = () => {
    const currentFavoriteRecipes = localStorage
      .getItem(LOCAL_STORAGE_FAVORITE_RECIPES);
    const parsedFavoriteRecipes = currentFavoriteRecipes
      ? JSON.parse(currentFavoriteRecipes)
      : [];

    return parsedFavoriteRecipes;
  };

  const setLocalStorage = (recipeObjectArray) => {
    const stringifiedArray = JSON.stringify(recipeObjectArray);

    localStorage.setItem(LOCAL_STORAGE_FAVORITE_RECIPES, stringifiedArray);
  };

  const checkIfIsFavorite = () => {
    const currentFavoriteRecipes = getLocalStorage();

    const checkIfFavorite = currentFavoriteRecipes
      .some((localStorageRecipe) => localStorageRecipe[`id${variableName}`]
    === recipeObject[`id${variableName}`]);

    setIsFavorite(checkIfFavorite);
  };

  useEffect(() => {
    checkIfIsFavorite();
  }, []);

  const extractInfoFromRecipeObject = () => {
    const nationality = type === 'meal' ? recipeObject.strArea : '';
    const alcoholicOrNot = type === 'drink' ? recipeObject.strAlcoholic : '';

    const id = recipeObject[`id${variableName}`];
    const category = recipeObject.strCategory;
    const name = recipeObject[`str${variableName}`];
    const image = recipeObject[`str${variableName}Thumb`];

    const constructedRecipeObject = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };

    return constructedRecipeObject;
  };

  const addToFavorite = () => {
    const constructedRecipeObject = extractInfoFromRecipeObject();

    const currentFavoriteRecipes = getLocalStorage();
    const newFavoriteRecipes = [...currentFavoriteRecipes, constructedRecipeObject];

    setLocalStorage(newFavoriteRecipes);
    setIsFavorite(true);
  };

  const removeFromFavorite = () => {
    const currentFavoriteRecipes = getLocalStorage();

    const filteredFavoriteRecipes = currentFavoriteRecipes
      .filter((localStorageRecipe) => localStorageRecipe.id
      !== recipeObject[`id${variableName}`]);

    setLocalStorage(filteredFavoriteRecipes);
    setIsFavorite(false);
  };

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorite();
    } else {
      addToFavorite();
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleFavorite }
      className={ isFavorite ? 'desfavoritar' : 'favoritar' }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }

    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="share"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  type: PropTypes.string.isRequired,
  recipeObject: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};
export default FavoriteButton;
