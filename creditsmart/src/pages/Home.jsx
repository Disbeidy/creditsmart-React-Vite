import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

import CreditCard from "../components/CreditCard";
import Footer from "../components/Footer";

export default function Home() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "creditos"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCredits(data);
      } catch (error) {
        console.error("Error cargando créditos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  return (
    <>
      <header className="hero">
        <div className="container">
          <h2>Bienvenido a CreditSmart</h2>
          <p>Tu plataforma para comparar y solicitar créditos en línea de manera fácil y rápida.</p>
        </div>
      </header>

      <main className="container">
        <section className="section credits">
          <h3 className="section-title">Nuestros productos</h3>

          {/* MENSAJE DE CARGA */}
          {loading && (
            <p
              style={{
                color: "#007bff",
                fontWeight: "bold",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Cargando productos...
            </p>
          )}

          {/* GRID DE CREDITOS */}
          <div className="credits-grid">
            {!loading &&
              credits.map((credit) => (
                <CreditCard
                  key={credit.id}
                  icono={credit.icono}
                  titulo={credit.titulo}
                  descripcion={credit.descripcion}
                  tasa={credit.tasa}
                  monto={credit.monto}
                  plazo={credit.plazo}
                />
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}