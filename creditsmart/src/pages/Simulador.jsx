import Footer from '../components/Footer';
import { useState } from 'react';
import { creditsData } from '../data/creditsData';

export default function Simulador() {
  const [buscar, setBuscar] = useState('');
  const [monto, setMonto] = useState('');
  const [resultados, setResultados] = useState(creditsData);

  // Estados para simulación personalizada
  const [montoPersonal, setMontoPersonal] = useState('');
  const [plazoPersonal, setPlazoPersonal] = useState('');
  const [tasaPersonal, setTasaPersonal] = useState('');
  const [cuotaPersonal, setCuotaPersonal] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const rango = {
      '1-10': [1, 10],
      '10-50': [10, 50],
      '50-100': [50, 100],
      '100-500': [100, 500],
    };

    const filtrados = creditsData.filter((p) => {
      const nombreCoincide = p.titulo.toLowerCase().includes(buscar.toLowerCase());
      const montoNum = parseInt(p.monto);

      const montoCoincide =
        !monto ||
        (rango[monto] &&
          montoNum >= rango[monto][0] * 1000000 &&
          montoNum <= rango[monto][1] * 1000000);

      return nombreCoincide && montoCoincide;
    });

    setResultados(filtrados);
  };

  const calcularCuota = (monto, tasa, plazo) => {
    const M = parseFloat(monto);
    const i = parseFloat(tasa) / 100;
    const n = parseInt(plazo);

    const mensual = (M * (i / 12)) / (1 - Math.pow(1 + i / 12, -n));
    return mensual.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    });
  };

  const calcularCuotaPersonal = (e) => {
    e.preventDefault();
    const M = parseFloat(montoPersonal);
    const i = parseFloat(tasaPersonal) / 100;
    const n = parseInt(plazoPersonal);

    if (!M || !i || !n) {
      setCuotaPersonal(null);
      return;
    }

    const mensual = (M * (i / 12)) / (1 - Math.pow(1 + i / 12, -n));
    setCuotaPersonal(
      mensual.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      })
    );
  };

  return (
    <>
      {/* ENCABEZADO */}
      <header className="hero">
        <div className="container">
          <h2>Simulador de Créditos</h2>
          <p>Filtra y explora las opciones de crédito que se ajustan a tus necesidades.</p>
        </div>
      </header>

      {/* FORMULARIO PERSONALIZADO */}
      <section className="container">
        <h3 className="section-title">Simula tu crédito personalizado</h3>
        <form className="filter-form" onSubmit={calcularCuotaPersonal}>
          <div className="form-group">
            <label htmlFor="montoPersonal">Monto solicitado:</label>
            <input
              type="number"
              id="montoPersonal"
              value={montoPersonal}
              onChange={(e) => setMontoPersonal(e.target.value)}
              placeholder="Ej: 30000000"
            />
          </div>
          <div className="form-group">
            <label htmlFor="plazoPersonal">Plazo (meses):</label>
            <input
              type="number"
              id="plazoPersonal"
              value={plazoPersonal}
              onChange={(e) => setPlazoPersonal(e.target.value)}
              placeholder="Ej: 60"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tasaPersonal">Tasa de interés anual (%):</label>
            <input
              type="number"
              id="tasaPersonal"
              value={tasaPersonal}
              onChange={(e) => setTasaPersonal(e.target.value)}
              placeholder="Ej: 18"
            />
          </div>
          <button type="submit" className="btn-primary">Calcular cuota</button>
        </form>

        {cuotaPersonal && (
          <p style={{ marginTop: '1rem', fontWeight: 'bold', color: '#004080' }}>
            Tu crédito de {parseInt(montoPersonal).toLocaleString('es-CO')} COP a {plazoPersonal} meses con {tasaPersonal}% anual genera una cuota mensual estimada de: {cuotaPersonal}
          </p>
        )}
      </section>

      {/* FILTROS DE PRODUCTOS */}
      <section className="container">
        <form className="filter-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="buscar">Buscar por nombre:</label>
            <input
              type="text"
              id="buscar"
              name="buscar"
              placeholder="Ej: Crédito Vehículo"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="monto">Filtrar por monto:</label>
            <select
              id="monto"
              name="monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="1-10">Entre $1M y $10M</option>
              <option value="10-50">Entre $10M y $50M</option>
              <option value="50-100">Entre $50M y $100M</option>
              <option value="100-500">Más de $100M</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Filtrar</button>
        </form>
      </section>

      {/* RESULTADOS */}
      <main className="container">
        <section className="section credits">
          <h3>Resultados</h3>
          <div className="credits-grid">
            {resultados.length > 0 ? (
              resultados.map((producto, index) => (
                <article className="credit-card" key={index}>
                  <div className="card-header">
                    <span className="icon">{producto.icono}</span>
                    <h4>{producto.titulo}</h4>
                  </div>
                  <p>{producto.descripcion}</p>
                  <div className="details">
                    <div className="detail-item">
                      <span className="label">Tasa de interés</span>
                      <span className="value">{producto.tasa}% anual</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Monto</span>
                      <span className="value">
                        {parseInt(producto.monto).toLocaleString('es-CO')} COP
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Plazo</span>
                      <span className="value">{producto.plazo} meses</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Cuota mensual estimada</span>
                      <span className="value">
                        {calcularCuota(producto.monto, producto.tasa, producto.plazo)}
                      </span>
                    </div>
                  </div>
                  <a href="/solicitar" className="btn-primary">Solicitar ahora</a>
                </article>
              ))
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER REUTILIZABLE */}
      <Footer />
    </>
  );
}