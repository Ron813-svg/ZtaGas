import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Assessment = () => {
  const [comment, setComment] = useState("");
  const [grade, setGrade] = useState("");
  const [role, setRole] = useState("");
  const [idEmployee, setIdEmployee] = useState("");

  const [assessment, setAssessment] = useState([]);
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
      const response = await fetch("http://localhost:4000/api/assessments");
      const data = await response.json();
      setAssessment(data);
    } catch (error) {
      console.error("Error a obtener los datos: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos que se enviarán al backend:");
    console.log("Comment:", comment);
    console.log("Grade:", grade);
    console.log("Role:", role);
    console.log("idEmployee:", idEmployee);

    try {
      const response = await fetch("http://localhost:4000/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          grade,
          role,
          idEmployee,
        }),
      });
      if (response.ok) {
        alert("Se ha ingresado todo correctamente");
        setComment("");
        setGrade("");
        setRole("");
        setIdEmployee("");
        setShowModal(false);
        fetchData();
      } else {
        throw new Error("Error en el registro");
      }
    } catch (error) {
      alert(
        "Error al registrarse. Por favor, revisa tus datos." + error.message
      );
      console.error("Error en el registro:", error);
    }
  };

  const deleteData = async (id) => {
    console.log("Eliminando ID:", id);
    try {
      const response = await fetch(
        `http://localhost:4000/api/assessments/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        showAutoAlert("Se ha borrado correctamente");
        fetchData();
      } else {
        throw new Error("Error al eliminar el blog");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleUpdate = async (id) => {
     console.log("ID que se pasa al update:", id);
    try {
     
      const response = await fetch(
        `http://localhost:4000/api/assessments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment,
            grade,
            role,
            idEmployee,
          }),
        }
      );
      if (response.ok) {
        alert("Se ha actualizado correctamente");
        await fetchData();
        setComment("");
        setGrade("");
        setRole("");
        setIdEmployee("");
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
    <button className="btn btn-primary col-sm" onClick={() => setShowModal(true)}>
      Agregar Evaluación
    </button>
  </div>

  {/* Modal Agregar Evaluación */}
  {showModal && (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ingresar Evaluación</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                setShowModal(false);
                setComment("");
                setGrade("");
                setRole("");
                setIdEmployee("");
              }}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Comentario</label>
                <input
                  type="text"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nota</label>
                <input
                  type="text"
                  className="form-control"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID Empleado</label>
                <input
                  type="text"
                  className="form-control"
                  value={idEmployee}
                  onChange={(e) => setIdEmployee(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Guardar Evaluación</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Lista de Evaluaciones */}
  <h3 className="text-center mt-5">Lista de Evaluaciones</h3>
  <div className="row">
    {assessment.map((item, index) => (
      <div key={index} className="col-md-4">
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Evaluación</h5>
            <p className="card-text"><strong>Comentario:</strong> {item.comment}</p>
            <p className="card-text"><strong>Nota:</strong> {item.grade}</p>
            <p className="card-text"><strong>Rol:</strong> {item.role}</p>
            <p className="card-text"><strong>ID Empleado:</strong> {item.idEmployee}</p>
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
                  setComment(item.comment);
                  setGrade(item.grade);
                  setRole(item.role);
                  setIdEmployee(item.idEmployee);
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
            <h5 className="modal-title">¿Estás seguro de eliminar esta evaluación?</h5>
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
            <h5 className="modal-title">Actualizar Evaluación</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setUpdateModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label className="form-label">Comentario</label>
                <input
                  type="text"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nota</label>
                <input
                  type="text"
                  className="form-control"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID Empleado</label>
                <input
                  type="text"
                  className="form-control"
                  value={idEmployee}
                  onChange={(e) => setIdEmployee(e.target.value)}
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

export default Assessment;
