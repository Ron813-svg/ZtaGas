import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Blogs = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); 

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
        showAutoAlert("Se ha borrado correctamente");
        await fetchData();
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

  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    try {
      console.log("ID que se pasa al update:", id);
      const response = await fetch(`http://localhost:4000/api/blog/${id}`, {
        method: "PUT",
        body: formData,
      });
      
      if (response.ok) {
        alert("Se ha actualizado correctamente");
        await fetchData() 
        setUpdateModal(false)
        setTitle("");
        setContent("");
        setImage(null);
        setPreviewImage(null);
        document.getElementById("image").value = "";

      } else {
        showAutoAlert("Hubo un error al actualizar ");
      }
    } catch (error) {
      
      console.log("Hubo un error: " + error);
    }
  };

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
         await fetchData();
        showAutoAlert("Se ha insertado correctamente");
        setTitle("");
        setContent("");
        setImage(null);
        setPreviewImage(null);
        document.getElementById("image").value = "";
        setShowModal(false);
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
      <div className="row justify-content-around col-2">
        <button
          className="btn btn-primary col-sm"
          onClick={() => setShowModal(true)}
        >
          Agregar nuevo blog
        </button>
      </div>

      {/*Parte de agregar*/}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ingresar Datos para el Blog</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false, setTitle(""), setContent(""), setImage(null)) }
                ></button>
              </div>
              <div className="modal-body">
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

                  <button type="submit" className="btn btn-success w-100">
                    Guardar Datos
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <div className="container-fluid row">
                <div className="row justify-content-around m-3">
                  {/*Parte de eliminar*/}
                  <button
                    onClick={() => setDeleteModal(true)}
                    className="btn btn-danger col-4"
                  >
                    Borrar
                  </button>

                  {deleteModal && (
                    <div className="modal show d-block" tabIndex="-1">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              Seguro quieres eliminarlo
                            </h5>
                          </div>
                          <div className="modal-body">
                            <div className="row justify-content-around">
                              <button
                                onClick={() =>
                                  deleteData(blog._id) && setDeleteModal(false)
                                }
                                className="btn btn-danger col-4"
                              >
                                Borrar
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteModal(false)}
                                className="btn btn-primary col-4"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Parte de actualizar*/}
                  <button
                    className="btn btn-primary col-4"
                    onClick={() => {
                      setUpdateModal(true);
                      setSelectedBlog(blog); // Guarda el blog seleccionado
                      setTitle(blog.title);
                      setContent(blog.content);
                      setPreviewImage(blog.image);
                      setImage(null);
                    }}
                  >
                    Actualizar
                  </button>
                  {updateModal && selectedBlog && (
                    <div className="modal show d-block" tabIndex="-1">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Ingresar Datos para el Blog</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => {
                                setUpdateModal(false);
                                setSelectedBlog(null);
                                setTitle("");
                                setContent("");
                                setImage(null);
                                setPreviewImage(null);
                              }}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={(e) => e.preventDefault()}>
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
                                {previewImage && (
                                  <img
                                    src={previewImage}
                                    alt="Vista previa"
                                    style={{ width: "100%", maxHeight: "200px", objectFit: "contain", marginBottom: "10px" }}
                                  />
                                )}
                                <input
                                  type="file"
                                  className="form-control"
                                  id="image"
                                  accept="image/*"
                                  onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    if (e.target.files[0]) {
                                      setPreviewImage(URL.createObjectURL(e.target.files[0]));
                                    }
                                  }}
                                />
                              </div>

                              <button
                                onClick={() => handleUpdate(selectedBlog._id)}
                                className="btn btn-info w-100"
                              >
                                Guardar los nuevos datos
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
