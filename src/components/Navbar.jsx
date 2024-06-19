import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
      </ul>
    </nav>
  );
}
