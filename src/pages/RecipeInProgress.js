import React, { useState, useEffect } from 'react';
import useRecipeInProgress from '../hooks/useRecipeInProgress';

function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const { recipe, mealsOrDrink, id } = useRecipeInProgress();

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

  const handleCheck = (ingredient) => {
    const copyIngredients = [...ingredients];
    const index = copyIngredients.findIndex((ing) => ing.ingredient === ingredient);
    copyIngredients[index].checked = true;
    setIngredients(copyIngredients);
    const parsedCheckedStorage = getLocalStorage();
    const storagedObject = handleNewLocalStorage(parsedCheckedStorage, ingredient);
    localStorage.setItem('inProgressRecipes', JSON.stringify(storagedObject));
    console.log('oi');
  };

  const findIfChecked = (ingredient) => {
    const currentLocalStorage = getLocalStorage();
    const key = mealsOrDrink === 'drink' ? 'drinks' : 'meals';
    const ingredientsArray = currentLocalStorage[key][id] || [];
    console.log(ingredientsArray);
    console.log(ingredient)

    return ingredientsArray.some((ingredi) => ingredi === ingredient);
  };

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
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Favoritar</button>
          <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          {ingredients.map((filter, index) => (
            <label
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
                onChange={ () => handleCheck(filter.ingredient) }
              />
            </label>
          ))}
          ;
          <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;
