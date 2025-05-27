import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StartPage from './pages/startpage/StartPage.jsx';
import Nav from './components/Nav/Nav.jsx';
import Home from './pages/Home/Home.jsx';
import Juegos from './pages/Juegos/Juegos.jsx';
import Clientes from './pages/Clientes/Clientes.jsx';

function App() {
  return (
    <Router>
      <NavVisibility />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Router>
  );
}

// Componente separado para controlar la visibilidad de Nav
function NavVisibility() {
  const location = useLocation(); // Obtiene la ubicación actual

  // Solo renderiza Nav si la ruta es '/home' o '/juegos'
  if (location.pathname === '/home' || location.pathname === '/juegos' || location.pathname === '/clientes') {
    return <Nav />;
  }

  return null; // En otras rutas, no renderiza Nav
}

export default App;
