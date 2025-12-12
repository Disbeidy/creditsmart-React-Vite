// src/seedfirestore.js
import { db } from "./firebase/config";     // ← ESTA ES TU RUTA REAL
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const creditsData = [
  {
    icono: "💰",
    titulo: "Crédito Libre Inversión",
    descripcion: "Obtén dinero rápido para cualquier necesidad sin justificar su uso.",
    tasa: 18,
    monto: 30000000,
    plazo: 60,
  },
  {
    icono: "🚗",
    titulo: "Crédito Vehículo",
    descripcion: "Financia la compra de tu carro nuevo o usado con tasas preferenciales.",
    tasa: 15,
    monto: 80000000,
    plazo: 72,
  },
  {
    icono: "🏠",
    titulo: "Crédito Vivienda",
    descripcion: "Haz realidad el sueño de tener casa propia con facilidades de pago.",
    tasa: 12,
    monto: 500000000,
    plazo: 180,
  },
  {
    icono: "🎓",
    titulo: "Crédito Educativo",
    descripcion: "Invierte en tu futuro con créditos diseñados para tus estudios universitarios.",
    tasa: 13,
    monto: 50000000,
    plazo: 84,
  },
  {
    icono: "🏢",
    titulo: "Crédito Empresarial",
    descripcion: "Impulsa tu negocio con capital flexible para tus proyectos empresariales.",
    tasa: 16,
    monto: 300000000,
    plazo: 120,
  },
  {
    icono: "👤",
    titulo: "Crédito Personal",
    descripcion: "Ideal para gastos imprevistos o pequeños proyectos personales.",
    tasa: 20,
    monto: 10000000,
    plazo: 36,
  },
];

const seedfirestore = async () => {
  try {
    console.log("Iniciando carga de datos a Firestore...");

    const auth = getAuth();
    let user = auth.currentUser;

    if (!user) {
      console.log("No hay usuario autenticado. Iniciando sesión anónima...");
      const result = await signInAnonymously(auth);
      user = result.user;
    }

    for (const credit of creditsData) {
      const creditWithUser = {
        ...credit,
        userId: user.uid,
      };

      const docRef = await addDoc(collection(db, "creditos"), creditWithUser);
      console.log("${credit.icono} agregado con ID: ${docRef.id}");
    }

    console.log("Todos los créditos han sido agregados exitosamente.");
  } catch (error) {
    console.error("Error al cargar datos: ", error);
  }
};

export default seedfirestore;
