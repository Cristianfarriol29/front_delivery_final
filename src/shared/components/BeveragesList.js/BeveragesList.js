import React from "react";
import Header from "../../../components/Header/Header";
import { useBeveragesContext } from "../../contexts/BeveragesContext";
import { useUserContext } from "../../contexts/UserContext";
import Beverage from "../Beverage/Beverage";

const BeveragesList = () => {
  const { beverages, beveragesSearch, search, setSearch } =
    useBeveragesContext();
  const { userRole } = useUserContext();

  return (
    <>
      <Header />
      <div className="inputSearch">
        <input
          placeholder={
            userRole === "basic"
              ? "Busca tu bebida favorita..."
              : "Busca el producto que deseas eliminar"
          }
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Beverage
        beverages={beveragesSearch.length > 0 ? beveragesSearch : beverages}
      />
      ;
    </>
  );
};

export default BeveragesList;
