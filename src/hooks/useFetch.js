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

  return {
    fetchData,
    isLoading,
  };
};

export default useFetch;
