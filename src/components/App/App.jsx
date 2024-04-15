import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import css from "./App.module.css";

import MovieCast from "../MovieCast";
import MovieReviews from "../MovieReviews";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

function App() {
  return (
    <div className={css.container}>
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
    </div>
  );
}

export default App;
