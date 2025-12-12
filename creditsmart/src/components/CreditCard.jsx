import React from "react";

export default function CreditCard({ icono, titulo, descripcion, tasa, monto, plazo }) {
  return (
    <article className="credit-card">
      <div className="card-header">
        <span className="icon">{icono}</span>
        <h4>{titulo}</h4>
      </div>
      <p>{descripcion}</p>

      <div className="details">
        <div className="detail-item">
          <span className="label">Tasa de interés</span>
          <span className="value">{tasa}% anual</span>
        </div>
        <div className="detail-item">
          <span className="label">Monto</span>
          <span className="value">
            {parseInt(monto).toLocaleString("es-CO")} COP
          </span>
        </div>
        <div className="detail-item">
          <span className="label">Plazo</span>
          <span className="value">{plazo} meses</span>
        </div>
      </div>

      <a href="/solicitar" className="btn-primary" aria-label={`Solicitar ${titulo.toLowerCase()}`}>
        Solicitar ahora
      </a>
    </article>
  );
}