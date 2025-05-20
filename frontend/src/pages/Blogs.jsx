import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Blogs = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image); 

    try {
      const response = await fetch("http://localhost:4000/api/blog", {
        method: "POST",
        body: formData, 
      });

      if (response.ok) {
        alert("Se ha insertado correctamente");
        navigate("/inicio");
      } else {
        throw new Error("Error en la inserción");
      }
    } catch (error) {
      alert("Error al insertar los datos: " + error.message);
      console.error("Error en el ingreso: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Ingresar Datos para el blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Contenido</label>
          <textarea
            className="form-control"
            id="content"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Seleccionar Imagen</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Guardar Datos</button>
      </form>
    </div>
  );
};

export default Blogs;
