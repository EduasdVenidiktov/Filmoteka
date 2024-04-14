import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import { getTrendingMovies } from "../../Api";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  const [params] = useSearchParams(); // Вилучили змінну setParams, оскільки вона не використовується

  const filter = params.get("filter") ?? "";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const fetchMovies = await getTrendingMovies({
          abortController: controller,
        });

        if (fetchMovies) {
          setMovies(fetchMovies);
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
  }, []);

  const filteredMovies =
    movies.length > 0
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(filter.toLowerCase())
        )
      : [];
  return (
    <div>
      <h1>Trending today</h1>
      {error && <p>Ooooppss, help!</p>}
      {movies.length > 0 && <MovieList movies={filteredMovies} />}
    </div>
  );
}
