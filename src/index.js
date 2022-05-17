import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BeveragesProvider from "./shared/contexts/BeveragesContext";
import CartProvider from "./shared/contexts/CartContext";
import DessertProvider from "./shared/contexts/DessertsContext";
import PizzaProvider from "./shared/contexts/PizzaContext";
import UserProvider from "./shared/contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PizzaProvider>
        <BeveragesProvider>
          <DessertProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </DessertProvider>
        </BeveragesProvider>
      </PizzaProvider>
    </UserProvider>
  </React.StrictMode>
);
