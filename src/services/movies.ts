import { MoviesResult } from "../interfaces/MovieModel";

export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=072b6164668a9378943c8d44786af0f4`
    );
    const json:MoviesResult = await response.json();

    const movies: MoviesResult = json ?? {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
    return movies?.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date,
      img: `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}` ,
    }));
  } catch (error) {
    throw new Error('Error searching movies')
  }
};
