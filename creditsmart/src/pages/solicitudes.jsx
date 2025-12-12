import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Footer from "../components/Footer";

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Cargar solicitudes desde Firestore
  const fetchSolicitudes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "solicitudes"));
      const data = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
      setMensaje("No se pudieron cargar las solicitudes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  // Eliminar solicitud
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "solicitudes", id));
      setSolicitudes(solicitudes.filter((s) => s.id !== id));
      setMensaje("Solicitud eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar solicitud:", error);
      setMensaje("No se pudo eliminar la solicitud.");
    }
  };

  // Filtrar por correo
  const filteredSolicitudes = solicitudes.filter((s) =>
    s.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  // Abrir modal
  const handleShowMore = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowModal(true);
  };

  // Guardar cambios en Firestore
  const handleSaveChanges = async () => {
    try {
      const ref = doc(db, "solicitudes", selectedSolicitud.id);
      await updateDoc(ref, {
        nombre: selectedSolicitud.nombre,
        cedula: selectedSolicitud.cedula,
        email: selectedSolicitud.email,
        telefono: selectedSolicitud.telefono,
        tipo: selectedSolicitud.tipo,
        monto: selectedSolicitud.monto,
        plazo: selectedSolicitud.plazo,
        destino: selectedSolicitud.destino,
        empresa: selectedSolicitud.empresa,
        cargo: selectedSolicitud.cargo,
        ingresos: selectedSolicitud.ingresos,
        cuotaEstimada: selectedSolicitud.cuotaEstimada,
      });
      setMensaje("✅ Solicitud actualizada correctamente.");
      setShowModal(false);
      fetchSolicitudes(); // recargar lista
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo actualizar la solicitud.");
    }
  };

  return (
    <>
      <header className="hero">
        <div className="container">
          <h2>Solicitudes Registradas</h2>
          <p>Busca solicitudes guardadas en Firebase por correo electrónico.</p>

          {/* Buscador por correo */}
          <input
            type="text"
            placeholder="Buscar por correo..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{
              padding: "0.5rem",
              marginTop: "1rem",
              width: "300px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
      </header>

      <main className="container">
        {loading ? (
          <p>Cargando solicitudes...</p>
        ) : filteredSolicitudes.length === 0 ? (
          <p>No hay solicitudes con ese correo.</p>
        ) : (
          filteredSolicitudes.map((s) => (
            <div
              key={s.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ color: "#004080" }}>{s.nombre}</h3>
              <p><strong>Email:</strong> {s.email}</p>
              <p><strong>Tipo de crédito:</strong> {s.tipo}</p>
              <p><strong>Monto:</strong> {parseInt(s.monto).toLocaleString("es-CO")} COP</p>

              {/* Botones */}
              <button
                style={{
                  backgroundColor: "#004080",
                  color: "white",
                  padding: "0.4rem 0.8rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "0.5rem",
                }}
                onClick={() => handleShowMore(s)}
              >
                Mostrar más
              </button>

              <button
                className="btn-danger"
                onClick={() => handleDelete(s.id)}
                style={{
                  backgroundColor: "#d9534f",
                  color: "white",
                  padding: "0.4rem 0.8rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        )}

        {mensaje && (
          <p style={{ marginTop: "1rem", fontWeight: "bold", color: "green" }}>
            {mensaje}
          </p>
        )}
      </main>

      {/* Modal emergente con opción de editar */}
      {showModal && selectedSolicitud && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              width: "500px",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h2>Editar Solicitud</h2>

            {/* Campos editables */}
            {[
              "nombre",
              "cedula",
              "email",
              "telefono",
              "tipo",
              "monto",
              "plazo",
              "destino",
              "empresa",
              "cargo",
              "ingresos",
              "cuotaEstimada",
            ].map((field) => (
              <div key={field} style={{ marginBottom: "0.8rem" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={field === "monto" || field === "plazo" || field === "ingresos" ? "number" : "text"}
                  value={selectedSolicitud[field] || ""}
                  onChange={(e) =>
                    setSelectedSolicitud({ ...selectedSolicitud, [field]: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
            ))}

            {/* Botones */}
            <button
              style={{
                marginTop: "1rem",
                backgroundColor: "#004080",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
              onClick={handleSaveChanges}
            >
              Guardar cambios
            </button>

            <button
              style={{
                marginTop: "1rem",
                backgroundColor: "#d9534f",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}