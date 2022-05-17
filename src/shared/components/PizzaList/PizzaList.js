import React from "react";
import { usePizzaContext } from "../../contexts/PizzaContext";
import Pizza from "../../components/Pizza/Pizza";
import "./_PizzaList.scss";
import { useUserContext } from "../../contexts/UserContext";

const PizzaList = () => {
  const { pizzas, search, setSearch, pizzasSearch } = usePizzaContext();
  const { userRole } = useUserContext();

  return (
    <>
      <div className="inputSearch">
        <input
          placeholder={
            userRole === "basic"
              ? "Busca tu pizza favorita..."
              : "Busca el producto que deseas eliminar"
          }
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Pizza pizzas={pizzasSearch.length > 0 ? pizzasSearch : pizzas} />;
    </>
  );
};

export default PizzaList;
