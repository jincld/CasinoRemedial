import bcryptjs from "bcryptjs";
import clientesModel from "../models/clientes.js";

const clientesController = {};

// GET - Obtener todos los clientes
clientesController.getClientes = async (req, res) => {
  try {
    const clientes = await clientesModel.find();
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};

// REGISTER - Crear nuevo cliente con validación de email y hash de contraseña
clientesController.registerCliente = async (req, res) => {
  const { email, password, edad, paisresidencia } = req.body;

  try {
    // Verificar si el email ya está registrado
    const existingCliente = await clientesModel.findOne({ email });
    if (existingCliente) {
      return res.status(400).json({ message: "El email ya está registrado, use otro" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear y guardar el cliente nuevo
    const nuevoCliente = new clientesModel({
      email,
      password: passwordHash,
      edad,
      paisresidencia,
    });

    await nuevoCliente.save();

    res.json({ message: "Cliente registrado exitosamente", cliente: nuevoCliente });
  } catch (error) {
    console.error("Error en registro de cliente:", error);
    res.status(500).json({ message: "Error en el registro de cliente" });
  }
};

// DELETE - Eliminar cliente
clientesController.deleteCliente = async (req, res) => {
  try {
    const deletedCliente = await clientesModel.findByIdAndDelete(req.params.id);
    if (!deletedCliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ message: "Error al eliminar cliente" });
  }
};

// UPDATE - Actualizar cliente, encriptando la contraseña solo si se envía
clientesController.updateCliente = async (req, res) => {
  const { email, password, edad, paisresidencia } = req.body;
  try {
    const updateData = { email, edad, paisresidencia };

    if (password) {
      updateData.password = await bcryptjs.hash(password, 10);
    }

    const updatedCliente = await clientesModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente actualizado", cliente: updatedCliente });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ message: "Error al actualizar cliente" });
  }
};

export default clientesController;
