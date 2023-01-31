import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FavoriteButton from '../components/Favoritar/FavoriteButton';
import ShareButton from '../components/Share/ShareButton';

export default function RecipeDetails(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [youtube, setYoutube] = useState('');
  const [showHasCopied, setShowHasCopied] = useState(false);
  const [recipeObject, setRecipeObject] = useState();
  const [isAlcoholic, setIsAlcoholic] = useState();
  const [path, setPath] = useState();
  const fetchData = async (URL) => {
    setIsLoading(true);
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setIsLoading(false);
      return json;
    } catch (error) {
      console.error('Algo deu errado:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getValues = (linksObject, key) => {
    const firstKey = Object.keys(linksObject)[0];
    const recipeObject = linksObject[firstKey][0];
    const measures = Object.entries(recipeObject)
      .filter(([chave]) => chave.includes(key))
      .reduce((acc, curr) => {
        if (curr[1]) acc.push(curr[1]);
        return acc;
      }, []);
    return measures;
  };

  const getItem = async () => {
    const { match: { params: { id } } } = props;
    const { type } = props;
    const APIToUse = type === 'drink' ? 'cocktail' : 'meal';
    const URL = `https://www.the${APIToUse}db.com/api/json/v1/1/lookup.php?i=${id}`;
    const links = await fetchData(URL);
    // Armazena a receita no estado global, para ser utilizada pelos componentes que precisarem
    const linksFirstKey = Object.keys(links)[0];
    const arrayWithRecipeObject = links[linksFirstKey];
    setRecipeObject(arrayWithRecipeObject[0]);

    if (APIToUse === 'meal') {
      const imageMeal = links.meals[0].strMealThumb;
      const titleMeal = links.meals[0].strMeal;
      const categoryTextMeal = links.meals[0].strCategory;
      const instructionsMeal = links.meals[0].strInstructions;
      const youtubeMeal = links.meals[0].strYoutube;
      const pathMeals = '/meals/:id/in-progress';

      const measureValues = getValues(links, 'Measure');
      const ingredientsValues = getValues(links, 'Ingredient');
      let ingredientsAndMeasures = [];
      ingredientsAndMeasures = measureValues
        .map((e, index) => `${e}${ingredientsValues[index]}`);

      setYoutube(youtubeMeal.replace('watch?v=', 'embed/'));
      setImage(imageMeal);
      setTitle(titleMeal);
      setCategoryText(categoryTextMeal);
      setIngredients(ingredientsAndMeasures);
      setInstructions(instructionsMeal);
      setPath(pathMeals);
    } else {
      const imageDrink = links.drinks[0].strDrinkThumb;
      const titleDrink = links.drinks[0].strDrink;
      const categoryTextDrinks = links.drinks[0].strCategory;
      const instructionsDrinks = links.drinks[0].strInstructions;
      const measureD = getValues(links, 'Measure');
      const valueDrink = getValues(links, 'Ingredient');
      let drinksIng = [];
      drinksIng = measureD.map((e, index) => `${e}${valueDrink[index]}`);
      const isItAlcoholic = links.drinks[0].strAlcoholic;
      const pathDrinks = '/drinks/:id/in-progress';

      setImage(imageDrink);
      setTitle(titleDrink);
      setCategoryText(categoryTextDrinks);
      setIngredients(drinksIng);
      setInstructions(instructionsDrinks);
      setIsAlcoholic(isItAlcoholic);
      setPath(pathDrinks);
    }

    return links;
  };
  useEffect(() => {
    getItem();
  }, []);

  const handleSubmit = () => {
    const { history } = props;
    // localStorage.setItem('', JSON.stringify ({}));
    history.push(path);
  };

  return (
    <div>
      { isLoading ? 'carregando' : (
        <div>
          <h1
            className="recipe-title"
            data-testid="recipe-title"
          >
            {title}
          </h1>
          <img
            className="recipe-image"
            data-testid="recipe-photo"
            src={ image }
            alt="foto da receita"
          />
          <p
            className="recipe-text"
            data-testid="recipe-category"
          >
            {categoryText}

            {isAlcoholic || ''}
          </p>
          {ingredients.map((filter, index) => (
            <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
              {filter}
            </p>
          ))}
          <p
            className="instructions-text"
            data-testid="instructions"
          >
            {instructions}
          </p>
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
      <div>
        <button
          data-testid="start-recipe-btn"
          className="button-start"
          onClick={ handleSubmit }
        >
          Start recipe
        </button>
      </div>
      <div className="share-and-favorite-buttons">
        <FavoriteButton />
        <ShareButton
          whatToCopy={ }
          setShowCopyFn={ setShowHasCopied }
          show={ showHasCopied }
        />
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // index: PropTypes.number.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
