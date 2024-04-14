import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import NotFoundPage from "../../pages/NotFoundPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage";
import MoviesPage from "../../pages/MoviesPage";
import HomePage from "../../pages/HomePage";
import { MovieCast } from "../MovieCast";
import { MovieReviews } from "../MovieReviews";

//===================МАРШРУТИ =============================
function App() {
  return (
    <header>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </header>
  );
}

export default App;
