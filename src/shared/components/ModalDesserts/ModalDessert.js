import React, { useEffect, useState } from "react";
import { useCartContext } from "../../contexts/CartContext";
import "./_ModalDessert.scss";
import Swal from "sweetalert2";

const ModalDessert = ({ closeModal, dessertFiltrada }) => {
  const { addToCart } = useCartContext();
  const [itemToBuy, setItemToBuy] = useState({});
  const dessert = Object.assign({}, ...dessertFiltrada);

  useEffect(() => {
    setItemToBuy({
      ...itemToBuy,
      id: dessert._id,
      name: dessert.name,
      img: dessert.img,
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
          <h3>{dessert.name}</h3>
          <img src={dessert.img} width={100} height={100} />
        </div>
        <div className="image">
          <div></div>
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
          <option value={dessert.price}>Small: ${dessert.price}</option>
        </select>

        <div className="footer">
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button
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
            AGREGAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDessert;
