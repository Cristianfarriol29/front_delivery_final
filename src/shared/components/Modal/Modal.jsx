import React, { useEffect, useState } from "react";
import { useCartContext } from "../../contexts/CartContext";
import "./_Modal.scss";
import Swal from "sweetalert2";

const Modal = ({ closeModal, pizzaFiltrada }) => {
  const { addToCart } = useCartContext();
  const [itemToBuy, setItemToBuy] = useState({});
  const pizza = Object.assign({}, ...pizzaFiltrada);

  const item = {
    cant: 0,
    price: 0,
    id: "",
    name: "",
    img: "",
  };

  useEffect(() => {
    setItemToBuy({
      ...itemToBuy,
      id: pizza._id,
      name: pizza.name,
      img: pizza.img,
    });
  }, []);

  return (
    <div className="modalBackground container">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button id="cancelBtn" onClick={() => closeModal(false)}>
            X
          </button>
        </div>

        <div className="title">
          <h1>{pizza.name}</h1>
          <img src={pizza.img} width={100} height={100} />
        </div>
        <div className="image">
          <div>
            <h1>Alergenos: </h1>
            <ul>
              {pizza.allergic.map((alergeno) => {
                return <li>{alergeno}</li>;
              })}
            </ul>
          </div>
          <div>
            <h1>Ingredientes: </h1>
            <ul>
              {pizza.ingredients.map((ingrediente) => {
                return <li>{ingrediente}</li>;
              })}
            </ul>
          </div>
        </div>

        <select
          className="pizza_card-individual-select"
          onChange={(e) =>
            setItemToBuy({
              ...itemToBuy,
              cant: Number(e.target.value),
            })
          }
        >
          <option value="">Seleccione una cantidad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <select
          className="pizza_card-individual-select"
          onChange={(e) =>
            setItemToBuy({
              ...itemToBuy,
              price: Number(e.target.value),
            })
          }
        >
          <option>Escoge el tamaño</option>
          <option value={pizza.price.small}>Small: ${pizza.price.small}</option>
          <option value={pizza.price.medium}>
            {" "}
            Medium: ${pizza.price.medium}
          </option>
          <option value={pizza.price.familiar}>
            Large: ${pizza.price.familiar}
          </option>
        </select>

        <div className="footer">
          <button className="btn" onClick={() => closeModal(false)}>
            Cancel
          </button>
          <button
            className="btn"
            onClick={() =>
              (itemToBuy.cant > 0) & !isNaN(itemToBuy.price) ||
              !isNaN(itemToBuy.subtotal)
                ? [
                    addToCart(itemToBuy),
                    Swal.fire(
                      "Correcto",
                      "El producto se agregó correctamente",
                      "success"
                    ),
                    closeModal(false),
                  ]
                : Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debes seleccionar la cantidad y el tamaño de las pizzas!",
                  })
            }
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
