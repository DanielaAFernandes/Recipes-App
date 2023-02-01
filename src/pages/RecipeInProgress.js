import React, { useState, useEffect } from 'react';
import useRecipeInProgress from '../hooks/useRecipeInProgress';

function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const { recipe } = useRecipeInProgress();

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
          .map((e, index) => `${e}${definedIngredients[index]}`);

        console.log(ingredientsAndMeasures);

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
              {filter}
              <input type="checkbox" value="step" name="step" />
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
