import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSearchMovies } from "../../Api";
import MovieList from "../components/MovieList/MovieList";
import { SearchForm } from "../components/SearchForm/SearchForm";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        if (query.trim() !== "") {
          const movies = await getSearchMovies(controller, query);
          setMovies(movies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSubmit = (value) => {
    navigate(`/movies?query=${encodeURIComponent(value)}`);
  };

  return (
    <main>
      <SearchForm onSubmit={handleSubmit} />
      {error && <p>Ooooppss, help!</p>}
      <MovieList movies={movies} />
    </main>
  );
}
