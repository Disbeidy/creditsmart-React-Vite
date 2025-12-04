import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Simulador from "./pages/Simulador";
import Solicitar from "./pages/Solicitar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/solicitar" element={<Solicitar />} />
      </Routes>
    </>
  );
}

export default App;