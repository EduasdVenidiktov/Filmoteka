import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchMovies } from "../../../Api";
import css from "./SearchForm.module.css";
import toast, { Toaster } from "react-hot-toast";

export function SearchForm() {
  const navigate = useNavigate(); // Функція навігації

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.query.value.trim(); // Отримуємо значення з інпута за ім'ям та видаляємо зайві пробіли
    form.reset(); // Скидаємо форму

    if (value !== "") {
      navigate(`/movies?query=${encodeURIComponent(value)}`); // Переходимо на сторінку фільмів з новим фільтром
    } else {
      toast.error("Будь ласка, введіть пошуковий запит.");
    }
  };

  useEffect(() => {
    // Завантаження фільмів при монтуванні компонента
    const fetchData = async () => {
      try {
        const movies = await getSearchMovies(""); // Порожній запит при монтуванні
        console.log("Знайдені фільми при монтуванні:", movies);
      } catch (error) {
        console.error("Помилка при завантаженні фільмів:", error);
      }
    };

    fetchData();
  }, []); // Порожній масив залежностей для виклику useEffect лише один раз при монтуванні

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.inputBtn}>
        <input
          type="text"
          name="query" // Ім'я для отримання значення з форми
          placeholder="Search movies..."
        />
        <button type="submit" className={css.btn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 22 22"
          >
            <path
              d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
                    c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
                    M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02
                    z"
            />
          </svg>
        </button>
      </div>
      <Toaster position="top-center" />
    </form>
  );
}
