import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function RecipeDetails(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [youtube, setYoutube] = useState('');
  const fetchData = async (URL) => {
    setIsLoading(true);
    try {
      const response = await fetch(URL, {
        mode: 'cors',
      });
      const json = await response.json();
      setIsLoading(false);
      return json;
    } catch (error) {
      console.error('Algo deu errado:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const getItem = async () => {
    const { match: { params: { id } } } = props;
    const { type } = props;
    const APIToUse = type === 'drink' ? 'cocktail' : 'meal';
    const URL = `https://www.the${APIToUse}db.com/api/json/v1/1/lookup.php?i=${id}`;
    const links = await fetchData(URL);

    if (APIToUse === 'meal') {
      const imageMeal = links.meals[0].strMealThumb;
      const titleMeal = links.meals[0].strMeal;
      const categoryTextMeal = links.meals[0].strCategory;
      const youtubeMeal = links.meals[0].strYoutube;
      const measuresMeal = (Object.keys(links.meals[0]))
        .filter((recipeKeys) => recipeKeys.includes('Measure'));
      const measureValues = measuresMeal.map((measure) => links.meals[0][measure]);
      console.log(measureValues);
      const ingredientsMeal = (Object.keys(links.meals[0]))
        .filter((ingredientsKeys) => ingredientsKeys.includes('Ingredient'));
      const ingredientsValues = ingredientsMeal
        .map((measure) => links.meals[0][measure]);
      let ingredientsAndMeasures = [];
      ingredientsAndMeasures = measureValues
        .map((e, index) => `${e}${ingredientsValues[index]}`);

      setYoutube(youtubeMeal.replace('watch?v=', 'embed/'));
      setImage(imageMeal);
      setTitle(titleMeal);
      setCategoryText(categoryTextMeal);
      setIngredients(ingredientsAndMeasures);
    } else {
      const imageDrink = links.drinks[0].strDrinkThumb;
      const titleDrink = links.drinks[0].strDrink;
      const categoryTextDrinks = links.drinks[0].strCategory;
      const measuresDrink = (Object.keys(links.drinks[0]))
        .filter((recipeKeys) => recipeKeys.includes('Measure'));
      const measureD = measuresDrink.map((measure) => links.drinks[0][measure]);
      const ingredientsD = (Object.keys(links.drinks[0]))
        .filter((ingredientsKeys) => ingredientsKeys.includes('Ingredient'));
      const valueDrink = ingredientsD
        .map((measure) => links.drinks[0][measure]);
      let drinksIng = [];

      drinksIng = measureD.map((e, index) => `${e}${valueDrink[index]}`);
      setImage(imageDrink);
      setTitle(titleDrink);
      setCategoryText(categoryTextDrinks);
      setIngredients(drinksIng);
    }

    return links;
  };
  useEffect(() => {
    getItem();
    fetchData();
  }, []);

  return (
    <div>
      { isLoading ? 'carregando' : (
        <div>
          <h1
            className="recipe-image"
            data-testid="recipe-photo"
          >
            {title}
          </h1>
          <img
            className="recipe-title"
            data-testid="recipe-photo"
            src={ image }
            alt="foto da receita"
          />
          <p
            className="recipe-text"
            data-testid="recipe-category"
          >
            {categoryText}
          </p>
          {ingredients.map((filter, index) => (
            <div data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
              <p>
                {filter}
              </p>
            </div>
          ))}
          <iframe
            data-testid="video"
            src={ youtube }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
  // index: PropTypes.number.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
