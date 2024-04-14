import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Oooopss, sorry... (</h1>
      <Link to="/">Go back</Link>
    </div>
  );
}
