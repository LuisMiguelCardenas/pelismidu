import React, { useMemo, useRef, useState } from "react";
import { MappedMovie } from "../interfaces/MovieModel";
import { searchMovies } from "../services/movies";

interface Props {
  query: string;
  sort: boolean;
}

const useMovies = ({ query, sort }: Props) => {
  const [movies, setMovies] = useState<MappedMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previousSearch = useRef(query);

  const getMovies = useMemo(() => {
   return async (search:string) => {
      if (previousSearch.current == search) return;
      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search;
        const newMovies = await searchMovies(search);
        setMovies(newMovies);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
  }, []);
  console.log("render");

  const sortMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return {
    movies: sortMovies,
    loading,
    error,
    getMovies,
  };
};

export default useMovies;
