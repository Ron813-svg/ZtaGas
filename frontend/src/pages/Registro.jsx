import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { use } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [dui, setDui] = useState('');
  const [isssNumber, setIsssNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastName,
          birthday,
          email,
          hireDate,
          password,
          telephone,
          dui,
          isssNumber
        }),
      });
      
      //if (response.ok) {
        alert('¡Registro exitoso!');
        navigate('/login'); // Redirigir a la página de inicio de sesión
      //} else {
       // throw new Error('Error en el registro');
        //alert('Error en el registro. Por favor, revisa tus datos.');
      //}
    } catch (error) {
      alert('Error al registrarse. Por favor, revisa tus datos.' + error.message);
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm" style={{ maxWidth: '22rem', width: '100%' }}>
        <div className="card-header bg-white text-black text-center">
          <h5 className="mb-0">Registrarse</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Apellido:</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ingresa tu apellido"
                required
              />
            </div>
            <div>
              <label htmlFor="birthday" className="form-label">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="birthday"
                className="form-control"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <div>
              <label htmlFor="hireDate" className="form-label">Fecha de Contratación:</label>
              <input
                type="date"
                id="hireDate"
                className="form-control"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea tu contraseña"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telephone" className="form-label">Teléfono:</label>
              <input
                type="tel"
                id="telephone"
                className="form-control"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="Ingresa tu teléfono"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dui" className="form-label">DUI:</label>
              <input
                type="text"
                id="dui"
                className="form-control"
                value={dui}
                onChange={(e) => setDui(e.target.value)}
                placeholder="Ingresa tu DUI"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="isssNumber" className="form-label">Número de ISSS:</label>
              <input
                type="text"
                id="isssNumber"
                className="form-control"
                value={isssNumber}
                onChange={(e) => setIsssNumber(e.target.value)}
                placeholder="Ingresa tu número de ISSS"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-success w-100">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
