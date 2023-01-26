import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      throw new Error('Algo deu errado:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getItem = async (endpoint, setStateCallBack, props) => {
    // Map props.match.path to variable mealsOrDrinks
    const { type } = props;
    const { match: { path: mealsOrDrinks } } = props;

    // Api a ser usada é 'thecocktailsdb' ou 'themealsdb'
    const APIToUse = type === 'drink' ? 'cocktail' : 'meal';

    // const URL = `https://www.the${APIToUse}db.com/api/json/v1/1/search.php?s=`;
    const URL = `https://www.the${APIToUse}db.com/api/json/v1/1/${endpoint}`;
    console.log(URL);
    const links = await fetchData(URL);

    if (setStateCallBack) {
      // links retorna um objeto com chave 'drinks' ou 'meals'.
      // Pega-se aqui do pathname, que será /drinks ou /meals
      // e removo o '/'.
      setStateCallBack(links[mealsOrDrinks.replace('/', '')]);
    } else {
      return links;
    }
  };

  return {
    getItem,
    fetchData,
    setIsLoading,
    isLoading,
  };
};

export default useFetch;
