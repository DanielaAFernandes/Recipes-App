/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const NUMBER_SIX = 6;

const useRecipeInProgress = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState(null);
  const mealsOrDrink = pathname.slice(1, NUMBER_SIX);
  const [ingredients, setIngredients] = useState(null);

  const fetchRecipe = async () => {
    if (mealsOrDrink === 'meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await makeFetch(url);
      setIngredients(makeListIngredients(data));
      setRecipe(data.meals[0]);
    } if (mealsOrDrink === 'drink') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await makeFetch(url);
      setRecipe(data.drinks[0]);
      setIngredients(makeListIngredients(data));
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return {
    recipe,
    ingredients,
  };
};

export default useRecipeInProgress;
