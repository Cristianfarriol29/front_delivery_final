import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const PizzaContext = React.createContext();

export const usePizzaContext = () => {
  return useContext(PizzaContext);
};

export default function PizzaProvider({ children }) {
  const [pizzas, setPizzas] = useState([]);
  const [pizzasSearch, setPizzasSearch] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/pizzas")
      .then((result) => setPizzas(result.data));
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      setPizzasSearch(
        pizzas.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search.length < 2) {
      setPizzasSearch([]);
    }
  }, [search]);

  const store = {
    pizzas,
    setPizzas,
    ingredientes,
    setIngredientes,
    search,
    setSearch,
    pizzasSearch,
  };

  return (
    <PizzaContext.Provider value={store}>{children}</PizzaContext.Provider>
  );
}
