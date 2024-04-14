import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailsMovies } from "../../Api";

function MovieDetailsPage() {
  const { movieId } = useParams(); // Отримуємо значення movieId з URL
  const [movie, setMovie] = useState(null); // Стан для зберігання даних про фільм
  const [error, setError] = useState(false);
  const location = useLocation(); // Отримуємо поточне місцезнаходження

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieDetails() {
      try {
        const movieDetails = await getDetailsMovies(controller, movieId); // Отримуємо дані про фільм з бекенду за допомогою movieId
        setMovie(movieDetails); // Зберігаємо дані про фільм у стан
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      }
    }

    fetchMovieDetails(); // Викликаємо функцію для отримання даних про фільм

    return () => {
      controller.abort(); // Скасовуємо запит при розмонтовуванні компонента
    };
  }, [movieId]); // Повторно запитуємо дані при зміні movieId

  if (!movie) {
    return <div>Loading...</div>; // Поки дані завантажуються, відображаємо індикатор завантаження
  }

  const backLinkState = { from: location.pathname }; // Сохраняем текущий URL в объекте состояния

  return (
    <main>
      <Link to={{ pathname: "/", state: backLinkState }}>Go back</Link>
      <div>
        (MovieDetails) - {movie.name} - {movieId}
      </div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>Overview</h2>
      <p>{movie.overview}</p>
      <h2>Genres</h2>
      <ul>
        {movie.genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      {error && <p>Ooooppss, help!</p>}
      <ul>
        <p>Education information</p>
        <li>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </main>
  );
}

export default MovieDetailsPage;
