import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

function Recommendations(props) {
  const [recommendations, setRecommendations] = useState({});
  const route = useLocation();
  const { fetchData } = useFetch();
  const { id } = props;

  const whatPage = async () => {
    const URLFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const URLDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    let getApi = [];

    if (route.pathname === `/drinks/${id}`) {
      getApi = await fetchData(URLFood);
      const { meals } = getApi;
      setRecommendations(meals);
    } else if (route.pathname === `/meals/${id}`) {
      getApi = await fetchData(URLDrink);
      const { drinks } = getApi;
      setRecommendations(drinks);
    }
    return getApi;
  };

  const defineShowRecommendations = (recipes) => {
    let idRecipe;
    let nameRecipe;
    let thumbRecipe;

    if (route.pathname === `/drinks/${id}`) {
      idRecipe = recipes.idMeal;
      nameRecipe = recipes.strMeal;
      thumbRecipe = recipes.strMealThumb;
    } else if (route.pathname === `/meals/${id}`) {
      idRecipe = recipes.idDrink;
      nameRecipe = recipes.strDrink;
      thumbRecipe = recipes.strDrinkThumb;
    }
    return { idRecipe, nameRecipe, thumbRecipe };
  };

  useEffect(() => {
    whatPage();
  }, []);

  const SIX_FIRST_LINKS = 6;

  return (
    <div>
      <p className="recommend">Recomendações</p>

      <div className="container">
        <div
          className="gallery"
        >
          {recommendations.length
            && recommendations.slice(0, SIX_FIRST_LINKS).map((recipes, index) => {
              const { thumbRecipe, nameRecipe } = defineShowRecommendations(recipes);
              return (
                <div
                  className="gallery-wraper"
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    className="imageRec"
                    src={ thumbRecipe }
                    alt="foto da receita"
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    { nameRecipe }
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// tabline AI autocomplete

export default Recommendations;

Recommendations.propTypes = {
  id: PropTypes.string.isRequired,
};
