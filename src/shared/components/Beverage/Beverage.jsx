import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalBeverages from "../ModalBeverages/ModalBeverages";

const Beverage = ({ beverages }) => {
  const [show, setShow] = useState(false);
  const [beverageFiltrada, setBeverageFiltrada] = useState([]);
  const [ID, setID] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  const filtrarBeverage = (id) => {
    setBeverageFiltrada(beverages.filter((p) => p._id === id));
  };

  return (
    <div className="pizza_card">
      {beverages.map((beverage) => {
        return (
          <div className="pizza_card-individual">
            <img src={beverage.img} width={250} height={250} />
            <h1>BEBIDA {beverage.name.toUpperCase()}</h1>
            <div className="pizza_card-individual-details resumen">
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour
              </p>
            </div>

            {user !== null && user.role !== "admin" ? (
              <button
                onClick={() => [
                  filtrarBeverage(beverage._id),
                  setShow(true),
                  setID(beverage._id),
                ]}
                className="btn"
              >
                Pedir
              </button>
            ) : (
              <Link to={`/admin/deleteproduct/beverage/${beverage._id}`}>
                <button className="btn">EDITAR PRODUCTO</button>
              </Link>
            )}

            {show &&
              ID === beverage._id &&
              user !== null &&
              user.role !== "admin" && (
                <ModalBeverages
                  beverageFiltrada={beverageFiltrada}
                  closeModal={setShow}
                />
              )}

            {show &&
              ID === beverage._id &&
              user !== null &&
              user.role === "admin" && <button>Eliminar producto</button>}
          </div>
        );
      })}
    </div>
  );
};

export default Beverage;
