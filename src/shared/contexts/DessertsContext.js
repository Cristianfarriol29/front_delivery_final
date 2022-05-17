import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const DessertContext = React.createContext();

export const useDessertContext = () => {
  return useContext(DessertContext);
};

export default function DessertProvider({ children }) {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/desserts")
      .then((result) => setDesserts(result.data));
  }, []);

  const store = {
    desserts,
    setDesserts,
  };

  return (
    <DessertContext.Provider value={store}>{children}</DessertContext.Provider>
  );
}
