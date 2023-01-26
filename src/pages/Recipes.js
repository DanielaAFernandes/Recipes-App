import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import RecipesLink from '../components/Recipes/RecipesLink';
import LinkContext from '../context/linkContext/LinkContext';
import Searchbar from '../components/Searchbar';
import CategoriesHolder from '../components/Recipes/Categories/CategoriesHolder';
import Header from '../components/Header';

function Recipes(props) {
  const { isLoading, setIsLoading, getItem } = useFetch();
  const [renderingLinks, setRenderingLinks] = useState([]);
  const [whatArrayLinkToRender, setWhatArrayLinkToRender] = useState([]);
  const { searchAPIResponse, hasStartedSearchingOrFiltering,
    isSearchBarToogled } = useContext(LinkContext);

  const getLinks = () => {
    getItem('search.php?s=', setRenderingLinks, props);
  };

  useEffect(() => {
    getLinks();
  }, []);

  // Se começou a procurar ou clickou em alguma categoria, renderize o array desse procura
  // Senão, renderiza o array inicial (12 primeiros links)
  useEffect(() => {
    setIsLoading(true);
    if (hasStartedSearchingOrFiltering || whatArrayLinkToRender === null) {
      setWhatArrayLinkToRender(searchAPIResponse);
    } else {
      setWhatArrayLinkToRender(renderingLinks);
    }
    setIsLoading(false);
  }, [searchAPIResponse, renderingLinks, hasStartedSearchingOrFiltering]);

  if (isLoading) return <p>Loading...</p>;

  const { match: { path: mealsOrDrinks } } = props;
  const { type } = props;
  const TWELVE_FIRST_LINKS = 12;

  const decideVariables = (link) => {
    let id;
    let name;
    let thumb;
    if (type === 'drink') {
      id = link.idDrink;
      name = link.strDrink;
      thumb = link.strDrinkThumb;
    } else {
      id = link.idMeal;
      name = link.strMeal;
      thumb = link.strMealThumb;
    }
    return { id, name, thumb };
  };

  return (
    <div>
      <Header title={ type === 'meal' ? 'Meals' : 'Drinks' } showIcon />
      { isSearchBarToogled && <Searchbar { ...props } />}
      <CategoriesHolder { ...props } />
      <div className="links">
        <p>Links</p>
        { whatArrayLinkToRender.slice(0, TWELVE_FIRST_LINKS).map((link, index) => {
          const { thumb, name, id } = decideVariables(link);
          return (
            <RecipesLink
              key={ name }
              path={ mealsOrDrinks }
              id={ id }
              thumb={ thumb }
              name={ name }
              index={ index }
            />
          );
        })}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
