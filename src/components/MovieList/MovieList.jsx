import { Link, useLocation } from "react-router-dom";

export const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      <h4>MovieList</h4>
      {movies.map((movie, index) => (
        <li key={`${movie.id}-${index}`}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
