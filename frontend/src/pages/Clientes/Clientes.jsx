import React, { useState, useEffect } from "react";
import './Clientes.css'; 

const Clientes = () => {
  const [clientes, setClientes] = useState([]); 
  const [nuevoCliente, setNuevoCliente] = useState({
    email: "",
    password: "",
    edad: "",
    paisresidencia: "",
  });
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(false);  // Estado para controlar si estamos en modo edición
  const [clienteEditado, setClienteEditado] = useState(null); // Estado para almacenar el cliente a editar

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const response = await fetch("http://localhost:4000/api/clientes");
    const data = await response.json();
    setClientes(data);
  };

  const handleAddCliente = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoCliente),
    });

    if (response.ok) {
      setNuevoCliente({ email: "", password: "", edad: "", paisresidencia: "" });
      fetchClientes();
    }
  };

  const handleDeleteCliente = async (id) => {
    const response = await fetch(`http://localhost:4000/api/clientes/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchClientes();
    }
  };

  const handleEditCliente = (cliente) => {
    setClienteEditado(cliente); // Guardamos el cliente a editar
    setNuevoCliente({
      email: cliente.email,
      password: cliente.password,  // Mostrar la contraseña en el campo de edición
      edad: cliente.edad,
      paisresidencia: cliente.paisresidencia,
    });
    setEditando(true);  // Activamos el modo edición
  };

  const handleCancelEdit = () => {
    setEditando(false);  // Desactivamos el modo edición
    setNuevoCliente({
      email: "",
      password: "",
      edad: "",
      paisresidencia: "",
    });
  };

  const handleUpdateCliente = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/clientes/${clienteEditado._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: clienteEditado.email, // Mantener el correo sin cambios
        password: nuevoCliente.password ? nuevoCliente.password : clienteEditado.password,  // Solo actualizar si se pasa contraseña
        edad: nuevoCliente.edad,
        paisresidencia: nuevoCliente.paisresidencia,
      }),
    });

    if (response.ok) {
      setEditando(false);  // Desactivamos el modo edición
      setClienteEditado(null);
      setNuevoCliente({
        email: "",
        password: "",
        edad: "",
        paisresidencia: "",
      }); // Limpiar los campos después de editar
      fetchClientes();
    }
  };

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className="backclientes"></div>
      <div className="container-main">
        <div className="container margin-top">
          <h1 className="titleclientes">GESTIÓN CLIENTES</h1>
          
          <div className="form-container">
            <h2 className="h2new">{editando ? "Editar Cliente" : "Agregar Nuevo Cliente"}</h2>
            <form onSubmit={editando ? handleUpdateCliente : handleAddCliente}>
              <div className="input-group">
                <label className="labelnew">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={nuevoCliente.email}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
                  required
                  disabled={editando} // Deshabilitar el campo si estamos editando
                />
              </div>

              <div className="input-group">
                <label className="labelnew">Contraseña</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={nuevoCliente.password}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, password: e.target.value })}
                  required={editando && !nuevoCliente.password} // Hacer el campo obligatorio si estamos editando y no hay nueva contraseña
                />
              </div>

              <div className="input-group">
                <label className="labelnew">Edad</label>
                <input
                  type="number"
                  placeholder="Edad"
                  value={nuevoCliente.edad}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, edad: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="labelnew">País de Residencia</label>
                <input
                  type="text"
                  placeholder="País de residencia"
                  value={nuevoCliente.paisresidencia}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, paisresidencia: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="edit-button">{editando ? "Guardar Cambios" : "Agregar Cliente"}</button>
              
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
              placeholder="Buscar cliente por correo..."
              value={busqueda}
              onChange={handleSearch}
            />
          </div>

          <table className="clientes-table">
            <thead>
              <tr>
                <th>Correo Electrónico</th>
                <th>Edad</th>
                <th>País de Residencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente._id}>
                  <td>{cliente.email}</td>
                  <td>{cliente.edad}</td>
                  <td>{cliente.paisresidencia}</td>
                  <td>
                    <button onClick={() => handleEditCliente(cliente)}>Editar</button>
                    <button onClick={() => handleDeleteCliente(cliente._id)}>Eliminar</button>
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

export default Clientes;
