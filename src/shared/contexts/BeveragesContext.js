import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const BeveragesContext = React.createContext();

export const useBeveragesContext = () => {
  return useContext(BeveragesContext);
};

export default function BeveragesProvider({ children }) {
  const [beverages, setBeverages] = useState([]);
  const [beveragesSearch, setBeveragesSearch] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/beverages")
      .then((result) => setBeverages(result.data));
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      setBeveragesSearch(
        beverages.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search.length < 2) {
      setBeveragesSearch([]);
    }
  }, [search]);

  const store = {
    beverages,
    setBeverages,
    search,
    setSearch,
    beveragesSearch,
    setBeveragesSearch,
  };

  return (
    <BeveragesContext.Provider value={store}>
      {children}
    </BeveragesContext.Provider>
  );
}
