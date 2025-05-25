import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Login from './pages/LogCard.jsx';
import Register from './pages/Registro.jsx';
import Inicio from './pages/Inicio.jsx';
import Blogs from './pages/Blogs.jsx';
import Assessment from './pages/Assessment.jsx';
import Product from './pages/Products.jsx';

function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const authRoutes = ['/login', '/register'];

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');
    const shouldHideNav = authRoutes.some((route) => currentPath === route || currentPath.startsWith(route + '/'));
    setIsOpen(!shouldHideNav);
  }, [location.pathname]);

  return (
    <>
      {isOpen && <Nav />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/assessment" element={<Assessment/>}/>
          <Route path="/products" element={<Product/>}/>
          
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
  );
}

export default App;
