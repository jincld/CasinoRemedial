import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import './StartPage.css';
import logoCasino from '/casinologolight.png'; // Ajusta esta ruta según dónde tengas tu logo

function StartPage() {
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  // Función que se ejecuta al hacer clic en el botón
  const handleButtonClick = () => {
    navigate('/home'); // Navega a /home
  };

  return (
    <>
      <div className="background"></div>
      <div className="background-gradient"></div>
      <div className="background-poker"></div>
      <div className="center-box">
        <img src={logoCasino} alt="Logo Casino" className="casino-logo" />
        <p className="description">
          En este sistema puedes administrar los juegos y clientes del casino.
        </p>
        <button className="start-button" onClick={handleButtonClick}>
          Entrar al sistema
        </button>
      </div>
    </>
  );
}

export default StartPage;
