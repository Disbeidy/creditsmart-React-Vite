import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Simulador from "./pages/Simulador";
import Solicitar from "./pages/Solicitar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/solicitar" element={<Solicitar />} />
      </Routes>
    </Router>
  );
}

export default App;
