import express from "express";
import juegosController from "../controllers/juegosController.js"; 

const router = express.Router();

router
  .route("/juegos")   
  .get(juegosController.getJuegos)
  .post(juegosController.createJuego);

router
  .route("/juegos/:id")
  .put(juegosController.updateJuego)
  .delete(juegosController.deleteJuego);

export default router;
