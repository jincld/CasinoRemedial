// Importo todo lo de la libreria de Express
import express from "express";
import cookieParser from "cookie-parser";
import juegosRoutes from "./src/routes/juegosRoutes.js";
import clientesRoutes from "./src/routes/clientesRoutes.js";
import cors from "cors";

// Creo una constante que es igual a la libreria que importé
const app = express();

app.use(cors({
    origin: "https://casino-remedial-delta.vercel.app/",
    credentials: true
  }));


//Que acepte datos en json
app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());
// Definir las rutas de las funciones que tendrá la página web
app.use("/api", juegosRoutes);
app.use("/api", clientesRoutes);
// Exporto la constante para poder usar express en otros archivos
export default app;