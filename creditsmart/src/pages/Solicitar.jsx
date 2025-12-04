import { useState } from "react";

export default function Solicitar() {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    email: "",
    telefono: "",
    tipo: "",
    monto: "",
    plazo: "",
    destino: "",
    empresa: "",
    cargo: "",
    ingresos: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [solicitudes, setSolicitudes] = useState([]); // array en memoria
  const [cuota, setCuota] = useState(null);

  // Manejar cambios en los inputs con validaciones en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones simples
    if (name === "email" && value && !value.includes("@")) {
      setMensaje("❌ El correo debe contener '@'");
    } else if (name === "telefono" && value && value.length < 7) {
      setMensaje("❌ El teléfono debe tener al menos 7 dígitos");
    } else {
      setMensaje("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Calcular cuota mensual automáticamente si cambia monto o plazo
    if (name === "monto" || name === "plazo") {
      calcularCuota(formData.monto || value, 18, formData.plazo || value);
    }
  };

  // Calcular cuota mensual estimada
  const calcularCuota = (monto, tasa = 18, plazo) => {
    const M = parseFloat(monto);
    const i = parseFloat(tasa) / 100;
    const n = parseInt(plazo);

    if (!M || !i || !n) {
      setCuota(null);
      return;
    }

    const mensual = (M * (i / 12)) / (1 - Math.pow(1 + i / 12, -n));
    setCuota(
      mensual.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      })
    );
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardar solicitud en memoria
    setSolicitudes([...solicitudes, formData]);

    // Mostrar resumen antes de enviar
    console.log("Resumen de solicitud:", formData);

    setMensaje(
      `✅ Solicitud enviada correctamente. Gracias ${formData.nombre}, pronto nos comunicaremos contigo.`
    );

    // Limpiar formulario
    setFormData({
      nombre: "",
      cedula: "",
      email: "",
      telefono: "",
      tipo: "",
      monto: "",
      plazo: "",
      destino: "",
      empresa: "",
      cargo: "",
      ingresos: "",
    });
    setCuota(null);
  };

  return (
    <>
      {/* ENCABEZADO */}
      <header className="hero">
        <div className="container">
          <h2>Formulario de Solicitud</h2>
          <p>Completa los datos para iniciar tu solicitud de crédito.</p>
        </div>
      </header>

      {/* FORMULARIO */}
      <main className="container">
        <form className="credit-form" onSubmit={handleSubmit}>
          {/* DATOS PERSONALES */}
          <fieldset>
            <legend>Datos Personales</legend>
            <label htmlFor="nombre">Nombre completo:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Disbeidy Anzueta Gongora"
              required
            />

            <label htmlFor="cedula">Cédula:</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="Ej: 1006449872"
              required
            />

            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: disbeidyanzueta@gmail.com"
              required
            />

            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 3204615438"
              required
            />
          </fieldset>

          {/* DATOS DEL CRÉDITO */}
          <fieldset>
            <legend>Datos del Crédito</legend>
            <label htmlFor="tipo">Tipo de crédito:</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option>Crédito Libre Inversión</option>
              <option>Crédito Vehículo</option>
              <option>Crédito Vivienda</option>
              <option>Crédito Educativo</option>
              <option>Crédito Empresarial</option>
              <option>Crédito Personal</option>
            </select>

            <label htmlFor="monto">Monto solicitado:</label>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              placeholder="Ej: 15000000"
              required
            />

            <label htmlFor="plazo">Plazo en meses:</label>
            <select
              id="plazo"
              name="plazo"
              value={formData.plazo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option>12</option>
              <option>24</option>
              <option>36</option>
              <option>48</option>
              <option>60</option>
            </select>

            <label htmlFor="destino">Destino del crédito:</label>
            <textarea
              id="destino"
              name="destino"
              rows="3"
              value={formData.destino}
              onChange={handleChange}
              placeholder="Ej: Remodelación de vivienda"
              required
            ></textarea>
          </fieldset>

          {/* DATOS LABORALES */}
          <fieldset>
            <legend>Datos Laborales</legend>
            <label htmlFor="empresa">Empresa donde trabaja:</label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Ej: Soluciones Financieras S.A.S"
              required
            />

            <label htmlFor="cargo">Cargo:</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="Ej: Analista de Software"
              required
            />

            <label htmlFor="ingresos">Ingresos mensuales:</label>
            <input
              type="number"
              id="ingresos"
              name="ingresos"
              value={formData.ingresos}
              onChange={handleChange}
              placeholder="Ej: 2500000"
              required
            />
          </fieldset>

          {/* RESUMEN */}
          {formData.monto && formData.plazo && (
            <p style={{ marginTop: "1rem", fontWeight: "bold", color: "#004080" }}>
              Resumen: Solicitas {parseInt(formData.monto).toLocaleString("es-CO")} COP a {formData.plazo} meses.
              {cuota && <> Cuota mensual estimada: {cuota}</>}
            </p>
          )}

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              Enviar Solicitud
            </button>
            <button
              type="reset"
              className="btn-primary"
              style={{ backgroundColor: "#ccc", color: "#000" }}
              onClick={() =>
                setFormData({
                  nombre: "",
                  cedula: "",
                  email: "",
                  telefono: "",
                  tipo: "",
                  monto: "",
                  plazo: "",
                  destino: "",
                  empresa: "",
                  cargo: "",
                  ingresos: "",
                })
              }
            >
              Limpiar Formulario
            </button>
          </div>
        </form>

        {/* MENSAJE DE CONFIRMACIÓN */}
        {mensaje && (
          <p style={{ marginTop: "1rem", fontWeight: "bold", color: "green" }}>
            {mensaje}
          </p>
        )}
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