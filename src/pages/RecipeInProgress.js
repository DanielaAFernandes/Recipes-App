import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from '../components/Favoritar/FavoriteButton';
import ShareButton from '../components/Share/ShareButton';
import useRecipeInProgress from '../hooks/useRecipeInProgress';

function RecipeInProgress(props) {
  const [ingredients, setIngredients] = useState([]);
  const { history, type } = props;
  const { recipe, mealsOrDrink, id, pathname } = useRecipeInProgress();
  const LOCAL_STORAGE_DONE_RECIPES = 'doneRecipes';

  const getLocalStorage = () => {
    const checkedStorage = localStorage.getItem('inProgressRecipes');
    const parsedCheckedStorage = checkedStorage ? JSON.parse(checkedStorage) : {
      drinks: { },
      meals: { },
    };
    return parsedCheckedStorage;
  };

  const handleNewLocalStorage = (parsedCheckedStorage, ingredient) => {
    if (mealsOrDrink === 'drink') {
      const currentId = parsedCheckedStorage.drinks[id] || [];
      const storagedObjectDrink = {
        drinks: {
          ...parsedCheckedStorage.drinks,
          [id]: [...new Set([...currentId, ingredient])],
        },
        meals: {
          ...parsedCheckedStorage.meals,
        },
      };
      return storagedObjectDrink;
    }

    const currentId = parsedCheckedStorage.meals[id] || [];
    console.log(parsedCheckedStorage);

    const storagedObjectMeal = {
      drinks: {
        ...parsedCheckedStorage.drinks,
      },
      meals: {
        ...parsedCheckedStorage.meals,
        [id]: [...new Set([...currentId, ingredient])],
      },
    };
    return storagedObjectMeal;
  };

  const handleCheck = (ingredient, checked) => {
    const copyIngredients = [...ingredients];
    const index = copyIngredients.findIndex((ing) => ing.ingredient === ingredient);
    copyIngredients[index].checked = !checked;
    setIngredients(copyIngredients);
    const parsedCheckedStorage = getLocalStorage();
    const storagedObject = handleNewLocalStorage(parsedCheckedStorage, ingredient);
    localStorage.setItem('inProgressRecipes', JSON.stringify(storagedObject));
  };

  const findIfChecked = (ingredient) => {
    const currentLocalStorage = getLocalStorage();
    const key = mealsOrDrink === 'drink' ? 'drinks' : 'meals';
    const ingredientsArray = currentLocalStorage[key][id] || [];
    console.log(ingredientsArray);
    console.log(ingredient);

    return ingredientsArray.some((ingredi) => ingredi === ingredient);
  };

  const isAllChecked = () => ingredients
    .every((ingredient) => ingredient.checked === true);

  useEffect(() => {
    const getValues = () => {
      if (recipe) {
        const measureKeys = Object.keys(recipe)
          .filter((name) => name.includes('Measure'));
        const measureValues = measureKeys.map((values) => recipe[values]);

        const ingredientKeys = Object.keys(recipe)
          .filter((name) => name.includes('Ingredient'));
        const ingredientValues = ingredientKeys.map((values) => recipe[values]);

        const number = 0;

        const definedMeasures = measureValues
          .filter((elem) => elem !== (' ') && elem !== null && elem.length > number);
        const definedIngredients = ingredientValues
          .filter((elem) => elem !== (' ') && elem !== null && elem.length > number);

        const ingredientsAndMeasures = definedMeasures
          .map((e, index) => `${e}${definedIngredients[index]}`)
          .map((ingredient) => ({
            ingredient, checked: findIfChecked(ingredient),
          }));

        setIngredients(ingredientsAndMeasures);
      }
    };
    getValues();
  }, [recipe]);

  const getDoneRecipesLocalStorage = () => {
    const checkedStorage = localStorage.getItem('doneRecipes');
    const parsedCheckedStorage = checkedStorage ? JSON.parse(checkedStorage) : [];
    return parsedCheckedStorage;
  };

  const extractInfoFromRecipeObject = () => {
    const variableName = type === 'drink' ? 'Drink' : 'Meal';
    const nationality = type !== 'drink' ? recipe.strArea : '';
    const alcoholicOrNot = type === 'drink' ? recipe.strAlcoholic : '';

    const idRecipe = recipe[`id${variableName}`];
    const category = recipe.strCategory;
    const name = recipe[`str${variableName}`];
    const image = recipe[`str${variableName}Thumb`];

    let tipo;
    if (type === 'meals') {
      tipo = 'meal';
    } else {
      tipo = type;
    }

    const constructedRecipeObject = {
      id: idRecipe,
      type: tipo,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
      doneDate: (new Date()).toISOString(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };

    return constructedRecipeObject;
  };

  const setLocalStorage = (recipeObjectArray) => {
    const stringifiedArray = JSON.stringify(recipeObjectArray);

    localStorage.setItem(LOCAL_STORAGE_DONE_RECIPES, stringifiedArray);
  };

  const finishRecipe = () => {
    const currentDoneRecipes = getDoneRecipesLocalStorage();
    const constructedRecipeObject = extractInfoFromRecipeObject();
    const newDoneRecipes = [...currentDoneRecipes, constructedRecipeObject];
    setLocalStorage(newDoneRecipes);
    history.push('/done-recipes');
  };

  return (
    <div className="inprogress">
      {recipe && (
        <>
          <img
            data-testid="recipe-photo"
            className="image-inprogress"
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt="foto-receita"
          />
          <h3 data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</h3>
          <FavoriteButton
            recipeObject={ recipe }
            type={ mealsOrDrink }
          />
          <ShareButton
            whatToCopy={ `http://localhost:3000${pathname.replace('/in-progress', '')}` }
          />
          <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          {ingredients.map((filter, index) => (
            <label
              className={ filter.checked ? 'risked' : '' }
              data-testid={ `${index}-ingredient-step` }
              key={ index }
              htmlFor="step"
            >
              {filter.ingredient}
              <input
                type="checkbox"
                value="step"
                name="step"
                checked={ filter.checked }
                onChange={ () => handleCheck(filter.ingredient, filter.checked) }
              />
            </label>
          ))}
          ;
          <button
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ finishRecipe }
            disabled={ !isAllChecked() }
          >
            Finalizar
          </button>
        </>
      )}
    </div>
  );
}

RecipeInProgress.defaultProps = {
  type: '',
};

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.string,
};

export default RecipeInProgress;
