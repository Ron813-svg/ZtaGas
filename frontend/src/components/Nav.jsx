import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Mi Aplicación</Link>
            <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" to="/inicio">Inicio</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/assessment">Evaluaciones</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blogs</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/products">Productos</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/login" 
                onClick={
                    async () => {
                        try{
                            const response = await fetch('http://localhost:4000/api/logout', {
                            method: 'POST',
                            credentials: 'include',
                        })
                        alert('Se ha cerrado sesion correctamente')
                        } catch (error){
                            alert('Error la cerrar sesion', error)
                            console.error('Error en al cerrar sesion', error);
                        }
                    }
                }>Cerrar Sesion</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}

export default Nav;