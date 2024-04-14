import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchForm({ onSubmit }) {
  const [value, setValue] = useState(""); // Состояние для хранения значения формы
  const navigate = useNavigate(); // Функция навигации

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value); // Передаем значение формы в функцию onSubmit
    navigate(`/movies?query=${value}`); // Переходим на страницу фильмов с новым фильтром
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
