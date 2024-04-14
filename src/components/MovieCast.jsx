import { useParams, useEffect } from "react";

function MovieCast() {
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    // Ваш код для отримання даних про акторів фільма
  }, [movieId]);

  // Решта вашого коду
}

export default MovieCast;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getCastMovies } from "../../Api";

// function MovieCast() {
//   const { movieId } = useParams();
//   const [cast, setCast] = useState([]);

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchCast() {
//       try {
//         const castData = await getCastMovies(controller, movieId);
//         setCast(castData);
//       } catch (error) {
//         console.error("Error fetching cast:", error);
//       }
//     }

//     fetchCast();

//     return () => {
//       controller.abort();
//     };
//   }, [movieId]);

//   if (cast.length === 0) {
//     return <div>Loading cast...</div>;
//   }

//   return (
//     <div>
//       <h2>Cast</h2>
//       <ul>
//         {cast.map((actor) => (
//           <li key={actor.id}>{actor.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MovieCast;

//https://api.themoviedb.org/3/movie/{movie_id}/credits
