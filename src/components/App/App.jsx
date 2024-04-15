import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import MovieCast from "../MovieCast";
import MovieReviews from "../MovieReviews";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/HomePage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

function App() {
  return (
    <header>
      <Navigation />
      <Suspense fallback={<p>Please, waiting. Loading page...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </header>
  );
}

export default App;
