import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Nav from './components/Nav.jsx'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './screen/LogCard.jsx'
import Register from './screen/Registro.jsx';


import Inicio from './screen/Inicio.jsx'

function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const authRoutes = ['/login', '/register'];

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');

    const shouldHideNav = authRoutes.some((route) => {
      return currentPath === route || currentPath.startsWith(route + '/')
  });
  setIsOpen(!shouldHideNav);
  }
  , [location.pathname]);
  return (
    <>
      {isOpen && <Nav />}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inicio" element={<Inicio />} />
        </Routes>
      </div>
    </>
  );
}

function App() {

  return (
    <Router>
      <AppContent />
    </Router>
    
  )
}

export default App
