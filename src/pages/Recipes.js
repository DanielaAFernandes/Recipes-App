import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import RecipesLink from '../components/Recipes/RecipesLink';
import LinkContext from '../context/linkContext/LinkContext';
import Searchbar from '../components/Searchbar';

function Recipes(props) {
  const { isLoading, setIsLoading, getItem } = useFetch();
  const [renderingLinks, setRenderingLinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [whatArrayLinkToRender, setWhatArrayLinkToRender] = useState([]);
  const { searchAPIResponse, hasStartedSearchingOrFiltering } = useContext(LinkContext);

  const getLinks = () => {
    getItem('search.php?s=', setRenderingLinks, props);
  };

  const getCategories = async () => {
    getItem('list.php?c=list', setCategories, props);
  };

  useEffect(() => {
    getLinks();
    getCategories();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (hasStartedSearchingOrFiltering) {
      setWhatArrayLinkToRender(searchAPIResponse);
    } else {
      setWhatArrayLinkToRender(renderingLinks);
    }
    setIsLoading(false);
  }, [searchAPIResponse, renderingLinks]);

  if (isLoading) return <p>Loading...</p>;

  const { match: { path: mealsOrDrinks } } = props;
  return (
    <div>
      <p>Links</p>
      { whatArrayLinkToRender.map((link, index) => {
        const { strDrinkThumb, strDrink, idDrink } = link;
        return (
          <RecipesLink
            key={ strDrink }
            path={ mealsOrDrinks }
            id={ idDrink }
            thumb={ strDrinkThumb }
            name={ strDrink }
            index={ index }
          />
        );
      })}
      <Searchbar { ...props } />
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
