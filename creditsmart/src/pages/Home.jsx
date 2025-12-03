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
            {/* Tarjetas de crédito */}
            {productos.map((producto, index) => (
              <article className="credit-card" key={index}>
                <div className="card-header">
                  <span className="icon">{producto.icono}</span>
                  <h4>{producto.titulo}</h4>
                </div>
                <p>{producto.descripcion}</p>
                <div className="details">
                  <div className="detail-item"><span className="label">Tasa de interés</span><span className="value">{producto.tasa}</span></div>
                  <div className="detail-item"><span className="label">Monto</span><span className="value">{producto.monto}</span></div>
                  <div className="detail-item"><span className="label">Plazo</span><span className="value">{producto.plazo}</span></div>
                </div>
                <a href="/solicitar" className="btn-primary" aria-label={`Solicitar ${producto.titulo.toLowerCase()}`}>Solicitar ahora</a>
              </article>
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
  {
    icono: '💰',
    titulo: 'Crédito Libre Inversión',
    descripcion: 'Obtén dinero rápido para cualquier necesidad sin justificar su uso.',
    tasa: '18% anual',
    monto: '$1M - $30M',
    plazo: 'Hasta 60 meses',
  },
  {
    icono: '🚗',
    titulo: 'Crédito Vehículo',
    descripcion: 'Financia la compra de tu carro nuevo o usado con tasas preferenciales.',
    tasa: '15% anual',
    monto: '$5M - $80M',
    plazo: 'Hasta 72 meses',
  },
  {
    icono: '🏠',
    titulo: 'Crédito Vivienda',
    descripcion: 'Haz realidad el sueño de tener casa propia con facilidades de pago.',
    tasa: '12% anual',
    monto: '$50M - $500M',
    plazo: 'Hasta 180 meses',
  },
  {
    icono: '🎓',
    titulo: 'Crédito Educativo',
    descripcion: 'Invierte en tu futuro con créditos diseñados para tus estudios universitarios.',
    tasa: '13% anual',
    monto: '$500K - $50M',
    plazo: 'Hasta 84 meses',
  },
  {
    icono: '🏢',
    titulo: 'Crédito Empresarial',
    descripcion: 'Impulsa tu negocio con capital flexible para tus proyectos empresariales.',
    tasa: '16% anual',
    monto: '$10M - $300M',
    plazo: 'Hasta 120 meses',
  },
  {
    icono: '👤',
    titulo: 'Crédito Personal',
    descripcion: 'Ideal para gastos imprevistos o pequeños proyectos personales.',
    tasa: '20% anual',
    monto: '$500K - $10M',
    plazo: 'Hasta 36 meses',
  },
];