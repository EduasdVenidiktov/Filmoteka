import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchMovies } from "../../Api";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="query" // Имя для получения значения из формы
        placeholder="Search movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
// ====  РАБОЧИЙ КОД!!! =============
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export function SearchForm({ onSubmit }) {
//   const [value, setValue] = useState(""); // Состояние для хранения значения формы
//   const navigate = useNavigate(); // Функция навигации

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (value.trim() !== "") {
//       // Проверяем, что значение не пустое
//       onSubmit(value); // Передаем значение формы в функцию onSubmit
//       navigate(`/movies?query=${encodeURIComponent(value)}`); // Переходим на страницу фильмов с новым фильтром
//     } else {
//       // В случае пустого значения можно вывести сообщение или выполнить другие действия
//       console.log("Пожалуйста, введите поисковый запрос.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         // name="name"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Search movies..."
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }
