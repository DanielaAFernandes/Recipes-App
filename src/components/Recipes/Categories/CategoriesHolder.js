// import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import LinkContext from '../../../context/linkContext/LinkContext';
import useFetch from '../../../hooks/useFetch';
import Category from './Category';

// EM PROGRESSO
function CategoriesHolder(props) {
  const [categories, setCategories] = useState([]);

  // Usado no micromanejamento da função de toggle, apenas isso!
  const [currentlyTriggeredCategory, setCurrentlyTriggeredCategory] = useState('all');

  const { setSearchAPIResponse,
    setHasStartedSearchingOrFiltering } = useContext(LinkContext);
  const { getItem } = useFetch();

  const getCategories = async () => {
    getItem('list.php?c=list', setCategories, props);
  };

  const getLinksFromCategory = (categoryName) => {
    if (currentlyTriggeredCategory === categoryName) {
      setHasStartedSearchingOrFiltering(false);
      setCurrentlyTriggeredCategory('all');
      return;
    }

    const setStateCallBack = (linksArr) => {
      setSearchAPIResponse(linksArr);
      setHasStartedSearchingOrFiltering(true);
    };

    getItem(`filter.php?c=${categoryName}`, setStateCallBack, props);
    setCurrentlyTriggeredCategory(categoryName);
  };

  useEffect(() => {
    getCategories();
  }, []);
  // Force github update

  const SHOW_FIVE_CATEGORIES = 5;
  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => setHasStartedSearchingOrFiltering(false) }
      >
        ALL
      </button>
      { categories.slice(0, SHOW_FIVE_CATEGORIES).map(({ strCategory }) => (
        <Category
          key={ strCategory }
          name={ strCategory }
          getLinksFromCategory={ getLinksFromCategory }
        />
      )) }
    </div>
  );
}

CategoriesHolder.propTypes = {
};
export default CategoriesHolder;
