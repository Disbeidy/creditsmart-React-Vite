import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#eee" }}>
      <Link to="/">Inicio</Link>
      <Link to="/simulador">Simulador</Link>
      <Link to="/solicitar">Solicitar</Link>
    </nav>
  );
} 