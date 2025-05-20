import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Blogs = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const showAutoAlert = (message) => {
    const alertDiv = document.createElement("div");
    alertDiv.textContent = message;
    alertDiv.style.position = "fixed";
    alertDiv.style.top = "20px";
    alertDiv.style.right = "20px";
    alertDiv.style.padding = "10px";
    alertDiv.style.backgroundColor = "green";
    alertDiv.style.color = "white";
    alertDiv.style.borderRadius = "5px";
    alertDiv.style.zIndex = "1000";
    alertDiv.style.opacity = "1";
    alertDiv.style.transition = "opacity 0.5s ease-out";
  
    document.body.appendChild(alertDiv);
  
    setTimeout(() => {
      alertDiv.style.opacity = "0";
      setTimeout(() => document.body.removeChild(alertDiv), 500);
    }, 3000);
  };
  

  const deleteData = async (id) => {
    console.log("Eliminando ID:", id); 
  
    try {
      const response = await fetch(`http://localhost:4000/api/blog/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        showAutoAlert("Se ha borrado correctamente")
        fetchData(); 
      } else {
        throw new Error("Error al eliminar el blog");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/blog");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error a obtener los datos: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        fetchData();
        showAutoAlert("Se ha insertado correctamente");
        ;
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
          <label htmlFor="title" className="form-label">
            Título
          </label>
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
          <label htmlFor="content" className="form-label">
            Contenido
          </label>
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
          <label htmlFor="image" className="form-label">
            Seleccionar Imagen
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Guardar Datos
        </button>
      </form>

      <h3 className="text-center mt-5">Lista de Blogs</h3>
      <div className="row">
        {blogs.map((blog, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-3">
              {blog.image && (
                <img src={blog.image} alt="Blog" className="card-img-top" />
              )}
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content}</p>
              </div>
              <div className="container-fluid m-2">
                <button onClick={() => deleteData(blog._id)} className="btn btn-danger">
                    Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
