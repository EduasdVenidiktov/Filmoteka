import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";

axios.defaults.baseURL = baseUrl;
const apiKey = "b70830133eaa33de090e4c660c472e08";

const params = {
  language: "en-US",
  append_to_response: "videos,images",
  api_key: apiKey,
};

//===========функція отримання переліку тренд фільмів на HomePage

export const getTrendingMovies = async (abortController) => {
  const response = await axios.get(`${baseUrl}/trending/movie/day`, {
    params,
    signal: abortController ? abortController.signal : undefined,
  });
  return response.data.results; // Повернення хапиту з функції
};

//=============функція пошуку фільмів
export const getSearchMovies = async (abortController, query) => {
  const response = await axios.get(`${baseUrl}/search/movie`, {
    params: {
      ...params, // Вмикаємо звгвльні параметри запиту
      query: query, // Додаємо параметр query
    },
    signal: abortController ? abortController.signal : undefined,
  });
  return response.data.results;
};

//=============функція отримання картки на обраний фільм

export const getDetailsMovies = async (abortController, movieId) => {
  const response = await axios.get(`${baseUrl}/movie/${movieId}`, {
    params,
    signal: abortController ? abortController.signal : undefined,
  });
  return response.data;
};

//=============функція отримання інфи про акторів на обраний фільм

export const getCastMovies = async (abortController, movieId) => {
  const response = await axios.get(`${baseUrl}/movie/${movieId}/credits`, {
    params,
    signal: abortController ? abortController.signal : undefined,
  });
  return response.data;
};

//=================функція отримання відгуку на обраний фільм

export const getReviewsMovies = async (abortController, movieId) => {
  const response = await axios.get(`${baseUrl}/movie/${movieId}/reviews`, {
    params,
    signal: abortController ? abortController.signal : undefined,
  });
  return response.data;
};
