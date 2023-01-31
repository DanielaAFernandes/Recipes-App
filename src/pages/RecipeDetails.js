import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FavoriteButton from '../components/Favoritar/FavoriteButton';
import ShareButton from '../components/Share/ShareButton';
import useFetch from '../hooks/useFetch';
import './RecipeDetails.style.css';

export default function RecipeDetails(props) {
  const { fetchData, isLoading } = useFetch();
  // Dados da receita para renderizar
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [youtube, setYoutube] = useState('');
  const [isAlcoholic, setIsAlcoholic] = useState();

  // Botão de começar a receita
  const [path, setPath] = useState();

  const getValues = (recipeObjectt, key) => {
    const measures = Object.entries(recipeObjectt)
      .filter(([chave]) => chave.includes(key))
      .reduce((acc, curr) => {
        if (curr[1]) acc.push(curr[1]);
        return acc;
      }, []);
    return measures;
  };

  const getItem = async () => {
    const { match: { params: { id } }, history } = props;
    const { type } = props;
    const APIToUse = type === 'drink' ? 'cocktail' : 'meal';

    const URL = `https://www.the${APIToUse}db.com/api/json/v1/1/lookup.php?i=${id}`;
    const links = await fetchData(URL);

    // Armazena a receita no estado global, para ser utilizada pelos componentes que precisarem
    const linksFirstKey = Object.keys(links)[0];
    const arrayWithRecipeObject = links[linksFirstKey];
    const recipeObject = arrayWithRecipeObject[0];

    const variableName = type === 'drink' ? 'Drink' : 'Meal';
    if (type === 'drink') {
      setIsAlcoholic(recipeObject.strAlcoholic);
    } else if (type === 'meal') {
      const youtubeRecipe = recipeObject.strYoutube;
      setYoutube(youtubeRecipe.replace('watch?v=', 'embed/'));
    }

    const imageRecipe = recipeObject[`str${variableName}Thumb`];
    const titleRecipe = recipeObject[`str${variableName}`];
    const categoryRecipe = recipeObject.strCategory;
    const instructionsRecipe = recipeObject.strInstructions;
    const pathRecipe = `${history.location.pathname}in-progress/`;

    const measureValues = getValues(recipeObject, 'Measure');
    const ingredientsValues = getValues(recipeObject, 'Ingredient');
    const ingredientsAndMeasures = measureValues
      .map((e, index) => `${e}${ingredientsValues[index]}`);

    setImage(imageRecipe);
    setTitle(titleRecipe);
    setCategoryText(categoryRecipe);
    setIngredients(ingredientsAndMeasures);
    setInstructions(instructionsRecipe);
    setPath(pathRecipe);

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

  const { history } = props;
  return (
    <div className="recipe-details">
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
          whatToCopy={ `http://localhost:3000${history.location.pathname}` }
        />
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  // index: PropTypes.number.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
