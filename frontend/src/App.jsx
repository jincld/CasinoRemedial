import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import StartPage from './pages/startpage/StartPage.jsx';

function App() {
  return (

      <Router>
          <Routes>
           <Route path="/" element={<StartPage />} />
          </Routes>
      </Router>

  );
}

export default App;