// Controlador para el modelo Juegos
const juegosController = {};
import JuegosModel from "../models/juegos.js";

// GET - Obtener todos los juegos
juegosController.getJuegos = async (req, res) => {
  try {
    const juegos = await JuegosModel.find();
    res.json(juegos);
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    res.status(500).json({ message: 'Error al obtener los juegos' });
  }
};

// POST - Crear nuevo juego
juegosController.createJuego = async (req, res) => {
  const { nombre, categoria, apuestaminima, apuestamaxima } = req.body;
  try {
    const nuevoJuego = new JuegosModel({ nombre, categoria, apuestaminima, apuestamaxima });
    const juegoGuardado = await nuevoJuego.save();
    res.json({ message: "Juego guardado", juego: juegoGuardado });
  } catch (error) {
    console.error('Error al guardar el juego:', error);
    res.status(500).json({ message: 'Error al guardar el juego' });
  }
};

// DELETE - Eliminar juego por ID
juegosController.deleteJuego = async (req, res) => {
  try {
    const juegoEliminado = await JuegosModel.findByIdAndDelete(req.params.id);
    if (!juegoEliminado) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.json({ message: "Juego eliminado exitosamente" });
  } catch (error) {
    console.error('Error al eliminar el juego:', error);
    res.status(500).json({ message: 'Error al eliminar el juego' });
  }
};

// PUT - Actualizar juego por ID
juegosController.updateJuego = async (req, res) => {
  const { nombre, categoria, apuestaminima, apuestamaxima } = req.body;
  try {
    const juegoActualizado = await JuegosModel.findByIdAndUpdate(
      req.params.id,
      { nombre, categoria, apuestaminima, apuestamaxima },
      { new: true }
    );
    if (!juegoActualizado) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.json({ message: "Juego actualizado", juego: juegoActualizado });
  } catch (error) {
    console.error('Error al actualizar el juego:', error);
    res.status(500).json({ message: 'Error al actualizar el juego' });
  }
};

export default juegosController;
