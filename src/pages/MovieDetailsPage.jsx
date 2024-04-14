import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailsMovies } from "../../Api";

function MovieDetailsPage() {
  const { movieId } = useParams(); // Отримуємо значення movieId з URL
  const [movie, setMovie] = useState(null); // Стан для зберігання даних про фільм
  const [error, setError] = useState(false);

  // Отримуємо поточне місцезнаходження
  const location = useLocation();
  // Перевіряємо, з якої сторінки прийшов користувач
  const backLinkHref = location.state ?? "/products";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieDetails() {
      try {
        // Отримуємо дані про фільм з бекенду за допомогою movieId
        const movieDetails = await getDetailsMovies(controller, movieId);
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

  // Поки дані завантажуються, відображаємо індикатор завантаження
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Link to={backLinkHref}>Go back</Link>

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

//=================================================================
// import { Link, useParams } from "react-router-dom";
// import { getTrendingMovies } from "../../Api";

// function MovieDetailsPage() {
//   const { movieId } = useParams(); // Получаем значение movieId из URL
//   const movie = getTrendingMovies(movieId); // Используем movieId для получения данных о фильме
//   console.log(movie);

//   return (
//     <main>
//       <Link to="/movies">Go back</Link>
//       <div>
//         (MovieDetails) - {movie.name} - {movieId}
//       </div>
//       <h1>(TITLE)</h1>
//       <Link>(Image)</Link>
//       <h2>Owerview</h2>
//       <p>(text)</p>
//       <h2>Genres</h2>
//       <p>(text)</p>
//       <div>
//         <p>Education information</p>
//         <div>
//           <Link to={`/movies/${movieId}/cast`}>Cast</Link>
//         </div>
//         <div>
//           <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default MovieDetailsPage;
