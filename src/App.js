import React, { useState } from 'react';
import './App.css'; // Asegúrate de tener el CSS adecuado

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    marca: '',
    cantidad: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4500/products/createProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          marca: formData.marca,
          cantidad: parseInt(formData.cantidad, 10)
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResponseMessage('Producto creado con éxito');
      setFormData({
        nombre: '',
        marca: '',
        cantidad: ''
      });
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="form-container">
          <p className="large-text">Agregar Datos de Contenido</p>
          <div className="button-group">
            <button className="btn-nuevo" type="button">Nuevo</button>
            <button className="btn-eliminar" type="button">Eliminar</button>
            <button className="btn-editar" type="button">Editar</button>
            <button className="btn-consultar" type="button">Consultar</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="marca">Marca:</label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Agregar</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
