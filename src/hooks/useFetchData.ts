import { useState } from "react";
import { Racer } from "../types";

const useFetchData = (url: string) => {
  const [data, setData] = useState<Racer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchResult = await fetch(url);
      const jsonResult = await fetchResult.json();
      setData(jsonResult.racers);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData, data };
};

export { useFetchData };
