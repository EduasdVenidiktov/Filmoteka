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

// https://api.themoviedb.org/3/search/movie?api_key=b70830133eaa33de090e4c660c472e08&language=en-US&page=1&include_adult=false&query=war

//=========удалиь если верхний вариант сработает===================
// import { useSearchParams } from "react-router-dom";
// import { getSearchMovies } from "../../Api";
// import { MovieList } from "../components/MovieList/MovieList";
// import { SearchForm } from "../components/SearchForm";

// export default function MoviesPage() {
//   const movies = getSearchMovies();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // const [error, setError] = useState(false);

//   const movieTitle = searchParams.get("title") ?? "";

//   const visibleMovies = movies.filter((movie) =>
//     movie.title.toLowerCase().includes(movieTitle.toLocaleLowerCase())
//   );

//   const updateQueryString = (title) => {
//     const nextParams = title !== "" ? { title } : {};
//     setSearchParams(nextParams);
//   };

//   return (
//     <main>
//       <SearchForm value={movieTitle} onChange={updateQueryString} />
//       <h2>MoviesPage</h2>
//       {/* {error && <p>Ooooppss, help!</p>} */}
//       <MovieList movies={visibleMovies} />
//     </main>
//   );
// }

//==============================================================
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { getSearchMovies } from "../../Api";
// import MovieList from "../components/MovieList/MovieList";
// import { SearchForm } from "../components/SearchForm";

// function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(false);
//   const [params, setSearchParams] = useSearchParams();
//   const filter = params.get("query") ?? "";

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchData() {
//       try {
//         const searchMovies = await getSearchMovies(controller, params);

//         if (searchMovies) {
//           setMovies(searchMovies);
//         }
//       } catch (error) {
//         if (error.code !== "ERR_CANCELED") {
//           setError(true);
//         }
//       }
//     }

//     fetchData();

//     return () => {
//       controller.abort();
//     };
//   }, [params]);

//   const handleSubmit = (value) => {
//     setSearchParams({ query: value }); // Обновляем параметры поиска при сабмите формы
//   };

//   const filteredMovies =
//     movies.length > 0
//       ? movies.filter((movie) =>
//           movie.title.toLowerCase().includes(filter.toLowerCase())
//         )
//       : [];

//   return (
//     <div>
//       <h2>MoviesPage</h2>
//       {error && <p>Ooooppss, help!</p>}
//       <SearchForm onSubmit={handleSubmit} />
//       {movies.length > 0 && <MovieList movies={filteredMovies} />}{" "}
//     </div>
//   );
// }

// export default MoviesPage;
