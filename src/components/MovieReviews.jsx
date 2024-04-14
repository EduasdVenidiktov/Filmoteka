import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsMovies } from "../../Api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchReviews() {
      try {
        const reviewsData = await getReviewsMovies(controller, movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      }
    }

    fetchReviews();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (reviews.length === 0) {
    return <div>Loading cast...</div>;
  }

  return (
    <section>
      {error && <p>Ooooppss, help!</p>}

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <div>
              <p>{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
