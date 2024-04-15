import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchForm({ onSubmit }) {
  const [value, setValue] = useState(""); // Состояние для хранения значения формы
  const navigate = useNavigate(); // Функция навигации

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      // Проверяем, что значение не пустое
      onSubmit(value); // Передаем значение формы в функцию onSubmit
      navigate(`/movies?query=${encodeURIComponent(value)}`); // Переходим на страницу фильмов с новым фильтром
    } else {
      // В случае пустого значения можно вывести сообщение или выполнить другие действия
      console.log("Пожалуйста, введите поисковый запрос.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        // name="name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
