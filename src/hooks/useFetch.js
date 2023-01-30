import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (URL) => {
    try {
      setIsLoading(true);
      const response = await fetch(URL, {
        mode: 'cors',
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getItem = async (endpoint, setStateCallBack, props, id) => {
    console.log(endpoint);
    // Map props.match.path to variable mealsOrDrinks
    const { type } = props;
    const { history: { location: { pathname: mealsOrDrinks } } } = props;
    // Api a ser usada é 'thecocktailsdb' ou 'themealsdb'
    const APIToUse = type === 'drink' ? 'cocktail' : 'meal';

    // const URL = `https://www.the${APIToUse}db.com/api/json/v1/1/search.php?s=`;
    const URL = `https://www.the${APIToUse}db.com/api/json/v1/1/${endpoint}`;
    const links = await fetchData(URL);

    if (id) {
      setStateCallBack(links[mealsOrDrinks.split('/')[0]]);
      return links;
    }

    // links retorna um objeto com chave 'drinks' ou 'meals'.
    // Pega-se aqui do pathname, que será /drinks ou /meals
    // e removo o '/'
    setStateCallBack(links[mealsOrDrinks.replace('/', '')]);
    // Retorna o link além do setState para caso onde for usado for fazer alguma outra lógica
    return links;
  };

  return {
    getItem,
    fetchData,
    setIsLoading,
    isLoading,
  };
};

export default useFetch;
