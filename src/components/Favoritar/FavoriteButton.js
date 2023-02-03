import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const { recipeObject, type, dataTestId, isFavoritePages } = props;
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
      .some((localStorageRecipe) => {
        const idToCheck = isFavoritePages
          ? recipeObject.id
          : recipeObject[`id${variableName}`];

        return localStorageRecipe.id === idToCheck;
      });

    setIsFavorite(checkIfFavorite);
  };

  useEffect(() => {
    checkIfIsFavorite();
  }, [recipeObject]);

  useEffect(() => {
    checkIfIsFavorite();
  }, []);

  const extractInfoFromRecipeObject = () => {
    const nationality = type !== 'drink' ? recipeObject.strArea : '';
    const alcoholicOrNot = type === 'drink' ? recipeObject.strAlcoholic : '';

    const id = recipeObject[`id${variableName}`];
    const category = recipeObject.strCategory;
    const name = recipeObject[`str${variableName}`];
    const image = recipeObject[`str${variableName}Thumb`];

    let tipo;
    if (type === 'meals') {
      tipo = 'meal';
    } else {
      tipo = type;
    }

    const constructedRecipeObject = {
      id,
      type: tipo,
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
    window.dispatchEvent(new Event('storage'));
  };

  const removeFromFavorite = () => {
    const currentFavoriteRecipes = getLocalStorage();

    const filteredFavoriteRecipes = currentFavoriteRecipes
      .filter((localStorageRecipe) => {
        const idToCheck = isFavoritePages
          ? recipeObject.id
          : recipeObject[`id${variableName}`];
        return localStorageRecipe.id !== idToCheck;
      });

    setLocalStorage(filteredFavoriteRecipes);
    setIsFavorite(false);
    window.dispatchEvent(new Event('storage'));
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
      data-testid={ dataTestId || 'favorite-btn' }
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

FavoriteButton.defaultProps = {
  type: '',
  recipeObject: PropTypes.shape({
    id: '' || null,
    idDrink: '',
    type: '',
    strArea: '',
    strCategory: '',
    strAlcoholic: '',
    strDrink: '',
    strDrinkThumb: '',
  }),
  dataTestId: '' || null,
  isFavoritePages: false,
};
FavoriteButton.propTypes = {
  type: PropTypes.string,
  recipeObject: PropTypes.shape({
    idDrink: PropTypes.string,
    type: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    id: PropTypes.string,
  }),
  dataTestId: PropTypes.string,
  isFavoritePages: PropTypes.bool,
};
export default FavoriteButton;
