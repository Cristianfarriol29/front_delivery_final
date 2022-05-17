import React from "react";
import Header from "../../components/Header/Header";
import PizzaList from "../../shared/components/PizzaList/PizzaList";
import { usePizzaContext } from "../../shared/contexts/PizzaContext";

export const HomePage = () => {
  const { pizzas } = usePizzaContext();
  return (
    <div className="container_home">
      {!pizzas.length && (
        <div class="container-spinner p-5">
          <h1 class="loading">Loading..</h1>
          <div class="spinner"></div>
        </div>
      )}
      {pizzas.length > 0 && (
        <>
          <Header />
          <PizzaList />
        </>
      )}
    </div>
  );
};
