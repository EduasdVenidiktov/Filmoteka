import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCastMovies } from "../../Api";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCast() {
      try {
        const castData = await getCastMovies(controller, movieId);
        setCast(castData.cast); // Обратите внимание на .cast, потому что объект ответа содержит поле cast, в котором находится массив актеров
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      }
    }

    fetchCast();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (cast.length === 0) {
    return <div>Loading cast...</div>;
  }

  return (
    <section>
      {error && <p>Ooooppss, help!</p>}

      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} //  profile_path для URL зображенн актора
              alt={actor.name}
              style={{ width: 100, height: 150 }} // Размеры изображения
            />

            <h4>{actor.name}</h4>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
