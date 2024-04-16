import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getDetailsMovies } from "../../../Api";
import css from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieDetailsPage() {
  const { movieId } = useParams(); // Отримуємо значення movieId з URL
  const [movie, setMovie] = useState(null); // Стан для зберігання даних про фільм
  const [error, setError] = useState(false);
  const location = useLocation(); // Отримуємо поточне місцезнаходження
  const backLinkHref = useRef("/"); // Зберігаємо URL попередньої сторінки за допомогою useRef

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

  useEffect(() => {
    // Збереження URL попередньої сторінки
    backLinkHref.current = location.state?.from ?? "/";
  }, [location.state]);

  if (!movie) {
    return <div>Loading...</div>; // Поки дані завантажуються, відображаємо індикатор завантаження
  }

  return (
    <main className={css.mainContainer}>
      <Link to={backLinkHref.current} className={css.goBack}>
        Go back
      </Link>
      <section className={css.blockDetails}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
        />
        <div className={css.textDetails}>
          <h1>{movie.title}</h1>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          {error && <p>Ooooppss, help!</p>}
        </div>
      </section>

      <div className={css.edInfoDetails}>
        <h3>Education information</h3>
        <ul>
          <li className={css.link}>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li className={css.link}>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </main>
  );
}

//======================  Рабочий код после ментора ================================================================
// import { Link, Outlet, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getDetailsMovies } from "../../../Api";
// import css from "./MovieDetailsPage.module.css";

// const defaultImg =
//   "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

// export default function MovieDetailsPage() {
//   const { movieId } = useParams(); // Отримуємо значення movieId з URL
//   const [movie, setMovie] = useState(null); // Стан для зберігання даних про фільм
//   const [error, setError] = useState(false);
//   const location = useLocation(); // Отримуємо поточне місцезнаходження
//   // const backLinkHref = location.state ?? "/movies";
//   const backLinkHref = location.state?.from ?? "/";

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchMovieDetails() {
//       try {
//         const movieDetails = await getDetailsMovies(controller, movieId); // Отримуємо дані про фільм з бекенду за допомогою movieId
//         setMovie(movieDetails); // Зберігаємо дані про фільм у стан
//       } catch (error) {
//         if (error.code !== "ERR_CANCELED") {
//           setError(true);
//         }
//       }
//     }

//     fetchMovieDetails(); // Викликаємо функцію для отримання даних про фільм

//     return () => {
//       controller.abort(); // Скасовуємо запит при розмонтовуванні компонента
//     };
//   }, [movieId]); // Повторно запитуємо дані при зміні movieId

//   if (!movie) {
//     return <div>Loading...</div>; // Поки дані завантажуються, відображаємо індикатор завантаження
//   }

//   return (
//     <main className={css.mainContainer}>
//       <Link to={backLinkHref} className={css.goBack}>
//         Go back
//       </Link>
//       <section className={css.blockDetails}>
//         <img
//           src={
//             movie.poster_path
//               ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//               : defaultImg
//           }
//           alt={movie.title}
//         />
//         <div className={css.textDetails}>
//           <h1>{movie.title}</h1>
//           <h2>Overview</h2>
//           <p>{movie.overview}</p>
//           <h2>Genres</h2>
//           <ul>
//             {movie.genres.map((genre) => (
//               <li key={genre.id}>{genre.name}</li>
//             ))}
//           </ul>
//           {error && <p>Ooooppss, help!</p>}
//         </div>
//       </section>

//       <div className={css.edInfoDetails}>
//         <h3>Education information</h3>
//         <ul>
//           <li className={css.link}>
//             <Link to={`/movies/${movieId}/cast`}>Cast</Link>
//           </li>
//           <li className={css.link}>
//             <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
//           </li>
//         </ul>
//         <Outlet />
//       </div>
//     </main>
//   );
// }
