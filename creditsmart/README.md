# CreditSmart
Aplicación web desarrollada con **React + Vite** que permite explorar productos crediticios, simular cuotas mensuales y gestionar solicitudes de crédito en línea con integración a **Firebase Firestore**.


## Nombre del estudiante
**Disbeidy Anzueta Gongora** y
**Daniela Anzueta Gongora**

---

## Descripción del proyecto
CreditSmart es una plataforma confiable y fácil de usar para comparar y solicitar créditos en línea.  
Incluye cuatro vistas principales:

- **Home:** carga automáticamente los productos de crédito desde Firestore y los muestra en tarjetas.
- **Simulador** simula cuotas mensuales estimadas según monto, plazo e interés.  
- **Solicitar:** formulario completo con validaciones en tiempo real y cálculo automático de la cuota mensual.  
- **Solicitudes:** consulta de solicitudes guardadas, búsqueda por correo, eliminación y edición mediante un modal.

---

## Tecnologías utilizadas
- **React + Vite** (Frontend principal)
- **React Router DOM** (Navegación entre páginas)
- **Firebase Firestore** (Base de datos en la nube)
- **Firebase Auth** (Autenticación anónima para carga inicial)
- **CSS personalizado** (Estilos y diseño responsivo)


---

## Instrucciones de instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Disbeidy/creditsmart-React-Vite.git
   cd creditsmart

2. Instalar dependencias:
   npm install

3. Ejecutar el servidor de desarrollo:
   npm run dev

4. Abrir en el navegador:
   http://localhost:5173/

## Capturas de pantalla

### Página de Inicio
![Home](/creditsmart/public/inicio.png)

### Simulador de Créditos
![Simulador](/creditsmart/public/simulador.png)

### Formulario de Solicitud
![Solicitud](/creditsmart/public/solicitar.png)

## Solicitudes registradas
![Solicitudes](/creditsmart/public/solicitudes.png)

---

## Integración con Firebase

Este proyecto está conectado a **Firebase Firestore** para manejar datos en la nube:

- Archivo `firebaseConfig.js` inicializa la app con las credenciales de Firebase y exporta la constante `db`, que representa la base de datos Firestore.
- Colecciones utilizadas:
  - **creditos**: contiene los productos de crédito que se muestran en la página principal.
  - **solicitudes**: guarda las solicitudes enviadas desde el formulario.

---

## Variables de entorno

Para proteger las credenciales, se usa un archivo `.env` (no incluido en el repositorio).  
En su lugar, se entrega un archivo `.env.example` con la estructura necesaria:

```bash
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID

---

## Pruebas funcionales

- **Home:** muestra mensaje *“Cargando productos…”* mientras trae datos desde Firestore.  
- **Solicitar:** formulario con validaciones en tiempo real y cálculo automático de cuota mensual.  
  - Al enviar, guarda la solicitud en la colección `solicitudes`.  
- **Solicitudes:** lista todas las solicitudes guardadas.  
  - Buscar por correo electrónico.  
  - Eliminar con `deleteDoc`.  
  - Editar con `updateDoc` desde un modal emergente.  

---

## Manejo de errores

- **Sin conexión a internet:**  
  - Home y Solicitudes muestran mensaje de error al no poder cargar datos.  
  - Solicitar muestra mensaje de error al intentar enviar sin conexión.  
- **Errores en Firestore:** capturados con `try/catch` y mostrados al usuario.
