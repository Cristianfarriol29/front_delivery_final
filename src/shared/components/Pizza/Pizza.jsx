import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import Modal from "../Modal/Modal";
import "./_Pizza.scss";

const Pizza = ({ pizzas }) => {
  const [show, setShow] = useState(false);
  const [pizzaFiltrada, setPizzaFiltrada] = useState([]);
  const [ID, setID] = useState("");
  const { userRole } = useUserContext();

  const filtrarPizza = (id) => {
    setPizzaFiltrada(pizzas.filter((p) => p._id === id));
  };

  return (
    <div className="pizza_card">
      {pizzas.map((pizza) => {
        return (
          <div className="pizza_card-individual">
            <img src={pizza.img} width={250} height={250} />
            <h1>PIZZA {pizza.name.toUpperCase()}</h1>
            <div className="pizza_card-individual-details resumen">
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour
              </p>
            </div>

            {userRole === "basic" && (
              <button
                onClick={() => [
                  filtrarPizza(pizza._id),
                  setShow(true),
                  setID(pizza._id),
                ]}
                className="btn"
              >
                Pedir
              </button>
            )}

            {userRole === "admin" && (
              <Link to={`/admin/deleteproduct/pizza/${pizza._id}`}>
                <button className="btn">EDITAR PRODUCTO</button>
              </Link>
            )}

            {show && (ID === pizza._id) & (userRole !== "admin") && (
              <Modal pizzaFiltrada={pizzaFiltrada} closeModal={setShow} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Pizza;
