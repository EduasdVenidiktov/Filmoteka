import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovies } from "../../Api";
import MovieList from "../components/MovieList/MovieList";
import { SearchForm } from "../components/SearchForm";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [params, setSearchParams] = useSearchParams();
  const filter = params.get("query") ?? "";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const searchMovies = await getSearchMovies(controller, params);

        if (searchMovies) {
          setMovies(searchMovies);
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
  }, [params]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value }); // Обновляем параметры поиска при сабмите формы
  };

  const filteredMovies =
    movies.length > 0
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(filter.toLowerCase())
        )
      : [];

  return (
    <div>
      <h2>MoviesPage</h2>
      {error && <p>Ooooppss, help!</p>}
      <SearchForm onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList movies={filteredMovies} />}{" "}
    </div>
  );
}

export default MoviesPage;

//======================================================================================
// import { useEffect, useState } from "react";
// import { useSearchParams, useParams } from "react-router-dom";
// import { getSearchMovies } from "../../Api";
// import Filter from "../components/Filter/Filter";
// import MovieList from "../components/MovieList/MovieList";
// import SearchForm from "../components/SearchForm"; // Импортируем компонент формы поиска

// function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   const [params, setParams] = useSearchParams();
//   useParams(); // Получаем movieId из параметров строки запроса

//   const filter = params.get("filter") ?? "";

//   const changeFilter = (newFilter) => {
//     setParams({ ...params, filter: newFilter });
//   };

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchData() {
//       try {
//         const fetchMovies = await getSearchMovies({
//           abortController: controller,
//         });

//         if (fetchMovies) {
//           setMovies(fetchMovies);
//         }
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     }

//     fetchData();

//     return () => {
//       controller.abort();
//     };
//   }, [params]); // Теперь useEffect будет вызываться при изменении параметров запроса

//   const handleSubmit = (value) => {
//     setParams({ ...params, filter: value }); // Обновляем параметры запроса при сабмите формы
//   };

//   return (
//     <div>
//       <h2>MoviesPage</h2>
//       <SearchForm onSubmit={handleSubmit} />{" "}
//       {/* Используем компонент формы поиска */}
//       {/* <Filter value={filter} onChange={changeFilter} /> */}
//       <MovieList movies={movies} />
//     </div>
//   );
// }

// export default MoviesPage;
//===================================================================
// import { useSearchParams } from "react-router-dom";
// import Filter from "../components/Filter/Filter";
// import { useEffect, useState } from "react";
// import { getTrendingMovies } from "../../Api";

// export default function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   // const [error, setError] = useState(false);

//   const [params, setParams] = useSearchParams(); // це не State!!!!

//   const filter = params.get("filter") ?? "";
//   console.log(filter);

//   const changeFilter = (newFilter) => {
//     params.set("filter", newFilter);
//     setParams(params);
//   }; // нові параметри додаються до вже існуючих

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchData() {
//       try {
//         const fetchMovies = await getTrendingMovies({
//           abortController: controller,
//         });

//         if (fetchMovies) {
//           // Устанавливаем список фильмов в состояние
//           setMovies(fetchMovies);
//         }
//       } catch (error) {
//         // if (error.code !== "ERR_CANCELED") {
//         //   //ERR_CANCELED не є помилкою
//         //   setError(true);
//         // }
//       }
//     }

//     fetchData();

//     return () => {
//       controller.abort();
//     };
//   }, []);
//   const filteredMovies = movies.filter((movie) =>
//     movie.title.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div>
//       <h2>MoviesPage</h2>
//       <Filter value={filter} onChange={changeFilter} />
//       {/* Вывод отфильтрованных фильмов */}
//       {filteredMovies.map((movie) => (
//         <div key={movie.id}>{movie.title}</div>
//       ))}
//     </div>
//   );
// }

//============================================================================================================

// // const [params, setParams] = useSearchParams(); // Получаем параметры из URL
// const movies = []; // Замените это на реальное получение списка фильмов
// const filter = params.get("filter") ?? ""; // Получаем значение фильтра из параметров URL

// const changeFilter = (newFilter) => {
//   params.set("filter", newFilter);
//   setParams(params);
// }; // нові параметри додаються до вже існуючих

// // Фильтруем фильмы по названию с учетом фильтра
// const filteredMovies = movies.filter((movie) =>
//   movie.title.toLowerCase().includes(filter.toLowerCase())
// );

// useEffect(() => {
//   const controller = new AbortController();

//   async function fetchData() {
//     try {
//       const fetchMovies = await getMovies({
//         abortController: controller,
//       });

//       if (fetchMovies) {
//         // Устанавливаем список фильмов в состояние
//         setMovies(fetchMovies);
//       }
//     } catch (error) {
//       if (error.code !== "ERR_CANCELED") {
//         //ERR_CANCELED не є помилкою
//         setError(true);
//       }
//     }
//   }

//   fetchData();

//   return () => {
//     controller.abort();
//   };
// }, []);
// const filteredMovies = movies.filter((movie) =>
//   movie.title.toLowerCase().includes(filter.toLowerCase())
// );
