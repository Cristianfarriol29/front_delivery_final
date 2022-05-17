import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const CartContext = React.createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  //CARRITO PERSISTENTE EN EL LOCALSTORAGE
  useEffect(() => {
    const carritoLS = JSON.parse(localStorage.getItem("carrito")) ?? [];
    //Puesto que el useEffect se actualiza dos veces, la manera de controlarlo es verificar que solamente ingrese el carrito si efectivamente tiene productos, de esta manera evitamos que lo pase vacio, ya que nunca lo mete si la longitud es 0
    if (carritoLS.length !== 0) {
      setCartItems(carritoLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cartItems));
  }, [cartItems]);

  ///FUNCION PARA AÑADIR PRODUCTOS AL CARRITO

  const addToCart = (item) => {
    const found = cartItems.some((p) => p.id === item.id);

    if (
      !found & (item.cant > 0) & !isNaN(item.price) ||
      !isNaN(item.subtotal)
    ) {
      item = {
        ...item,
        subtotal: item.cant * item.price,
      };
      setCartItems([...cartItems, item]);
    } else if (
      found & ((item.cant > 0) & !isNaN(item.price) || !isNaN(item.subtotal))
    ) {
      let carritoActualizado = cartItems.map((p) =>
        p.id === item.id
          ? (p = item =
              {
                ...item,
                cant: item.cant,
                price: item.price,
                subtotal: item.cant * item.price,
              })
          : p
      );
      setCartItems(carritoActualizado);
    }
  };

  ///FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO

  const deleteItems = (productoAEliminar) => {
    const actualizarCarrito = cartItems.filter((productoEnElCarrito) => {
      return productoEnElCarrito.id !== productoAEliminar.id;
    });
    setCartItems(actualizarCarrito);
  };

  ///FUNCION PARA RESTAR PRODUCTOS DEL CARRITO
  const restarItems = (productoARestar) => {
    const actualizarCarrito = cartItems.filter((productoEnElCarrito) => {
      if (
        productoARestar.id === productoEnElCarrito.id &&
        productoARestar.cant > 0
      ) {
        productoEnElCarrito.cant--;
        productoEnElCarrito.subtotal =
          productoEnElCarrito.subtotal - productoEnElCarrito.price;
        setCartItems([...cartItems]);

        if (productoARestar.cant === 0) {
          let carritoActualizado = cartItems.filter(
            (p) => p.id !== productoARestar.id
          );
          setCartItems(carritoActualizado);
        }
      }
    });
  };

  const sumarItems = (productoASumar) => {
    const actualizarCarrito = cartItems.filter((productoEnElCarrito) => {
      if (productoASumar.id === productoEnElCarrito.id) {
        productoEnElCarrito.cant++;
        productoEnElCarrito.subtotal = productoEnElCarrito.subtotal +=
          productoEnElCarrito.price;
        setCartItems([...cartItems]);
      }
    });
  };

  const store = {
    addToCart,
    cartItems,
    setCartItems,
    deleteItems,
    restarItems,
    sumarItems,
  };

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
}
