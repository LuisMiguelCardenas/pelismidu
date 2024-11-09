import React, { useCallback, useEffect, useState } from "react";
import MoviesComponent from "./components/Movies";
import useMovies from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";
import "./App.css";

function App() {
  const [sort, setSort] = useState(false);

  const { error, query, setQuery } = useSearch();
  const { movies, getMovies, loading } = useMovies({
    query: query,
    sort: sort,
  });

  // Crea una función debounced para `getMovies`
  const debounceGetMovies = useCallback(
    debounce((query: string) => {
      getMovies(query);
    }, 500),
    [getMovies]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getMovies(query); // Llamada directa para la búsqueda al hacer submit
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debounceGetMovies(newQuery); // Ejecuta la función debounced cuando cambia el valor
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="movies-container-main">
      <header>
        <h1>Buscador de películas</h1>
        <form className="movie_form" onSubmit={handleSubmit}>
          <input
            value={query}
            onChange={handleChange}
            type="text"
            placeholder="Ingrese la pelicula a buscar"
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        {error !== "" && <p>{error}</p>}
        {loading ? <span>Loading..</span> : <MoviesComponent movies={movies} />}
      </main>
    </div>
  );
}

export default App;
