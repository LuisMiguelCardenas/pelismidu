import React from "react";
import { MappedMovie } from "../interfaces/MovieModel";
import './Movies.css'

interface Props {
  movies: MappedMovie[];
}

const MoviesComponent = ({ movies }: Props) => {
  return (
    <div className="movies-content">
      {movies.length !== 0 && (
        <ul className="movie-container-list">
          {movies.map((movie: MappedMovie) => (
            <li key={movie.id} className="movie-container">
              <li className="movie-title" key={movie.id}>{movie.title}</li>
              <span>{movie.year}</span>
              <img src={movie.img} alt={movie.title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesComponent;
