import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchMovies } from "../../../Api";
import css from "./SearchForm.module.css";

export function SearchForm() {
  const navigate = useNavigate(); // Функция навигации

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.query.value.trim(); // Получаем значение из инпута по имени и удаляем лишние пробелы
    form.reset(); // Сбрасываем форму

    if (value !== "") {
      navigate(`/movies?query=${encodeURIComponent(value)}`); // Переходим на страницу фильмов с новым фильтром
    } else {
      console.log("Пожалуйста, введите поисковый запрос.");
    }
  };

  useEffect(() => {
    // Загрузка фильмов при монтировании компонента
    const fetchData = async () => {
      try {
        const movies = await getSearchMovies(""); // Пустой запрос при монтировании
        console.log("Найденные фильмы при монтировании:", movies);
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей для вызова useEffect только один раз при монтировании

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.inputBtn}>
        <input
          type="text"
          name="query" // Имя для получения значения из формы
          placeholder="Search movies..."
        />
        <button type="submit" className={css.btn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
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
    </form>
  );
}
