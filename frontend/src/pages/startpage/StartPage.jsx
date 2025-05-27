import React from "react";
import './StartPage.css';
import logoCasino from '/casinologolight.png'; // Ajusta esta ruta según dónde tengas tu logo

function StartPage() {
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
        <button className="start-button" onClick={() => alert('¡Vamos al sistema!')}>
          Entrar al sistema
        </button>
      </div>
    </>
  );
}

export default StartPage;
