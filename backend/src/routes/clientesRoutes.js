import express from "express";
import clientesController from "../controllers/clientesController.js";

const router = express.Router();

router
  .route("/clientes")
  .get(clientesController.getClientes)
  .post(clientesController.registerCliente);

router
  .route("/clientes/:id")
  .put(clientesController.updateCliente)
  .delete(clientesController.deleteCliente);

export default router;
