import React, { useState, useEffect } from "react";
import './Juegos.css'; 

const Juegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({
    nombre: "",
    categoria: "",
    apuestaminima: "",
    apuestamaxima: "",
  });
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(false);  // Estado para controlar si estamos en modo edición
  const [juegoEditado, setJuegoEditado] = useState(null); // Estado para almacenar el juego a editar

  useEffect(() => {
    fetchJuegos();
  }, []);

  const fetchJuegos = async () => {
    const response = await fetch("https://casinoremedial.onrender.com/api/juegos");
    const data = await response.json();
    setJuegos(data);
  };

  const handleAddJuego = async (e) => {
    e.preventDefault();
    const response = await fetch("https://casinoremedial.onrender.com/api/juegos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoJuego),
    });

    if (response.ok) {
      setNuevoJuego({ nombre: "", categoria: "", apuestaminima: "", apuestamaxima: "" });
      fetchJuegos();
    }
  };

  const handleDeleteJuego = async (id) => {
    const response = await fetch(`https://casinoremedial.onrender.com/api/juegos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchJuegos();
    }
  };

  const handleEditJuego = (juego) => {
    setJuegoEditado(juego); // Guardamos el juego a editar
    setNuevoJuego({
      nombre: juego.nombre,
      categoria: juego.categoria,
      apuestaminima: juego.apuestaminima,
      apuestamaxima: juego.apuestamaxima,
    });
    setEditando(true);  // Activamos el modo edición
  };

  const handleCancelEdit = () => {
    setEditando(false);  // Desactivamos el modo edición
    setNuevoJuego({
      nombre: "",
      categoria: "",
      apuestaminima: "",
      apuestamaxima: "",
    });
  };

  const handleUpdateJuego = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://casinoremedial.onrender.com/api/juegos/${juegoEditado._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nuevoJuego.nombre,
        categoria: nuevoJuego.categoria,
        apuestaminima: parseFloat(nuevoJuego.apuestaminima),
        apuestamaxima: parseFloat(nuevoJuego.apuestamaxima),
      }),
    });

    if (response.ok) {
      setEditando(false);  // Desactivamos el modo edición
      setJuegoEditado(null);
      fetchJuegos();
    }
  };

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const filteredJuegos = juegos.filter((juego) =>
    juego.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
    <div className="backjuegos"></div>
    <div className="container-main">
    <div className="container margin-top">
      <h1 className="titlegames">GESTIÓN JUEGOS</h1>
      
      <div className="form-container">
        <h2 className="h2new">{editando ? "Editar Juego" : "Agregar Nuevo Juego"}</h2>
        <form onSubmit={editando ? handleUpdateJuego : handleAddJuego}>
          <div className="input-group">
            <label className="labelnew">Nombre del juego</label>
            <input
              type="text"
              placeholder="Nombre del juego"
              value={nuevoJuego.nombre}
              onChange={(e) => setNuevoJuego({ ...nuevoJuego, nombre: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label className="labelnew">Categoría</label>
            <input
              type="text"
              placeholder="Categoría"
              value={nuevoJuego.categoria}
              onChange={(e) => setNuevoJuego({ ...nuevoJuego, categoria: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label className="labelnew">Apuesta Mínima</label>
            <input
              type="number"
              placeholder="Apuesta Mínima"
              value={nuevoJuego.apuestaminima}
              onChange={(e) => setNuevoJuego({ ...nuevoJuego, apuestaminima: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label className="labelnew">Apuesta Máxima</label>
            <input
              type="number"
              placeholder="Apuesta Máxima"
              value={nuevoJuego.apuestamaxima}
              onChange={(e) => setNuevoJuego({ ...nuevoJuego, apuestamaxima: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="edit-button">{editando ? "Guardar Cambios" : "Agregar Juego"}</button>
          
          {/* Mostrar el botón de cancelar solo si estamos en modo edición */}
          {editando && (
            <button type="button" onClick={handleCancelEdit} className="edit-button">
              Cancelar Edición
            </button>
          )}
        </form>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar juego..."
          value={busqueda}
          onChange={handleSearch}
        />
      </div>

      <table className="games-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Apuesta Mínima</th>
            <th>Apuesta Máxima</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredJuegos.map((juego) => (
            <tr key={juego._id}>
              <td>{juego.nombre}</td>
              <td>{juego.categoria}</td>
              <td>{juego.apuestaminima}</td>
              <td>{juego.apuestamaxima}</td>
              <td>
                <button onClick={() => handleEditJuego(juego)}>Editar</button>
                <button onClick={() => handleDeleteJuego(juego._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default Juegos;
