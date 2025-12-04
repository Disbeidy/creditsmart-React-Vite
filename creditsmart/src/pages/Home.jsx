import CreditCard from "../components/CreditCard";

export default function Home() {
  return (
    <>
      {/* BANNER PRINCIPAL */}
      <header className="hero">
        <div className="container">
          <h2>Bienvenido a CreditSmart</h2>
          <p>Tu plataforma para comparar y solicitar créditos en línea de manera fácil y rápida.</p>
        </div>
      </header>

      {/* PRODUCTOS CREDITICIOS */}
      <main className="container">
        <section className="section credits">
          <h3 className="section-title">Nuestros productos</h3>
          <div className="credits-grid">
            {productos.map((producto, index) => (
              <CreditCard
                key={index}
                icono={producto.icono}
                titulo={producto.titulo}
                descripcion={producto.descripcion}
                tasa={producto.tasa}
                monto={producto.monto}
                plazo={producto.plazo}
              />
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-col">
            <h5>CreditSmart</h5>
            <p>Tu aliado confiable para encontrar el crédito ideal.</p>
          </div>
          <div className="footer-col">
            <h5>Enlaces útiles</h5>
            <a href="#">Política de privacidad</a>
          </div>
          <div className="footer-col">
            <h5>Contáctanos</h5>
            <p>📍 Villanueva, Colombia</p>
            <p>📞 +57 300 452 7597</p>
            <p>📧 contacto@creditsmart.co</p>
          </div>
        </div>
      </footer>
    </>
  );
}

const productos = [
  { icono: "💰", titulo: "Crédito Libre Inversión", descripcion: "Obtén dinero rápido...", tasa: "18% anual", monto: "$1M - $30M", plazo: "Hasta 60 meses" },
  { icono: "🚗", titulo: "Crédito Vehículo", descripcion: "Financia la compra...", tasa: "15% anual", monto: "$5M - $80M", plazo: "Hasta 72 meses" },
  { icono: "🏠", titulo: "Crédito Vivienda", descripcion: "Haz realidad el sueño...", tasa: "12% anual", monto: "$50M - $500M", plazo: "Hasta 180 meses" },
  { icono: "🎓", titulo: "Crédito Educativo", descripcion: "Invierte en tu futuro...", tasa: "13% anual", monto: "$500K - $50M", plazo: "Hasta 84 meses" },
  { icono: "🏢", titulo: "Crédito Empresarial", descripcion: "Impulsa tu negocio...", tasa: "16% anual", monto: "$10M - $300M", plazo: "Hasta 120 meses" },
  { icono: "👤", titulo: "Crédito Personal", descripcion: "Ideal para gastos...", tasa: "20% anual", monto: "$500K - $10M", plazo: "Hasta 36 meses" },
];