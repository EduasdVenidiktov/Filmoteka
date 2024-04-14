import { useParams, useEffect } from "react";

function MovieReviews() {
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    // Ваш код для отримання відгуків на фільм
  }, [movieId]);

  // Решта вашого коду
}

export default MovieReviews;
//https://api.themoviedb.org/3/movie/{movie_id}/reviews
