import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../shared/services/api";
import { useDessertContext } from "../../shared/contexts/DessertsContext";

const AdminDeleteBeverage = () => {
  let token = localStorage.getItem("token");
  const { id } = useParams();
  const { desserts } = useDessertContext();

  const dessertToDelete = desserts.filter((p) => p._id === id);

  const navigate = useNavigate();

  const deleteItem = (idProd) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este producto?",
      text: "Recuerda que si lo eliminas, no podrás recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Eliminar
        API.delete(`/products/desserts/${idProd}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response.status === 200) {
            Swal.fire(
              "Correcto",
              "El producto se elimino correctamente.",
              "success"
            ).then(
              (result) => result.isConfirmed && window.location.reload(true)
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un problema a la hora de crear el producto.",
            });
          }
        });
      }
      navigate("/desserts");
    });
  };

  return (
    <div>
      {dessertToDelete.map((dessert) => {
        return (
          <div className="pizza_card-individual">
            <img src={dessert.img} width={250} height={250} />
            <h1>BEBIDA {dessert.name.toUpperCase()}</h1>
            <div className="pizza_card-individual-details resumen">
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour
              </p>
            </div>

            <button className="btn" onClick={() => deleteItem(dessert._id)}>
              ELIMINAR PRODUCTO
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AdminDeleteBeverage;
