import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      console.log("Respuesta del backend:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error a obtener los datos: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
        }),
      });
      if (response.ok) {
        showAutoAlert("Producto agregado correctamente");
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setShowModal(false);
        fetchData();
      } else {
        const errorData = await response.json();
        alert(
          "Error en el registro: " +
            (errorData.message || JSON.stringify(errorData))
        );
        throw new Error(
          "Error en el registro: " +
            (errorData.message || JSON.stringify(errorData))
        );
      }
    } catch (error) {
      alert("Error al registrar el producto. " + error.message);
      console.error("Error en el registro:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        showAutoAlert("Producto eliminado correctamente");
        fetchData();
      } else {
        throw new Error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
        }),
      });
      if (response.ok) {
        showAutoAlert("Producto actualizado correctamente");
        await fetchData();
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setUpdateModal(false);
      } else {
        showAutoAlert("Hubo un error al actualizar");
      }
    } catch (error) {
      console.log("Hubo un error: " + error);
    }
  };
  return (
    <div className="container mt-5">
      {/* Botón para abrir el modal */}
      <div className="row justify-content-around col-2 mb-3">
        <button
          className="btn btn-primary col-sm"
          onClick={() => setShowModal(true)}
        >
          Agregar Producto
        </button>
      </div>

      {/* Modal Agregar Producto */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ingresar Producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setName("");
                    setDescription("");
                    setPrice("");
                    setStock("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Guardar Producto
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Productos */}
      <h3 className="text-center mt-5">Lista de Productos</h3>
      <div className="row">
        {products.map((item, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  <strong>Descripción:</strong> {item.description}
                </p>
                <p className="card-text">
                  <strong>Precio:</strong> {item.price}
                </p>
                <p className="card-text">
                  <strong>Stock:</strong> {item.stock}
                </p>
              </div>
              <div className="container-fluid row">
                <div className="row justify-content-around m-3">
                  <button
                    className="btn btn-danger col-4"
                    onClick={() => {
                      setDeleteModal(true);
                      setSelectedId(item._id);
                    }}
                  >
                    Borrar
                  </button>
                  <button
                    className="btn btn-primary col-4"
                    onClick={() => {
                      setName(item.name);
                      setDescription(item.description);
                      setPrice(item.price);
                      setStock(item.stock);
                      setUpdateModal(true);
                      setSelectedId(item._id);
                    }}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Eliminar */}
      {deleteModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  ¿Estás seguro de eliminar este producto?
                </h5>
              </div>
              <div className="modal-body">
                <div className="row justify-content-around">
                  <button
                    className="btn btn-danger col-4"
                    onClick={() => {
                      deleteData(selectedId);
                      setDeleteModal(false);
                    }}
                  >
                    Borrar
                  </button>
                  <button
                    className="btn btn-primary col-4"
                    onClick={() => setDeleteModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Actualizar */}
      {updateModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setUpdateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    className="btn btn-info w-100"
                    onClick={() => {
                      handleUpdate(selectedId);
                      setUpdateModal(false);
                    }}
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
  );
};

export default Products;
