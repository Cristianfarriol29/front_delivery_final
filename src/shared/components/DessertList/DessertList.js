import React from "react";
import Header from "../../../components/Header/Header";
import { useDessertContext } from "../../contexts/DessertsContext";
import Dessert from "../Dessert/Dessert";

const DessertList = () => {
  const { desserts } = useDessertContext();

  return (
    <>
      <Header />
      <Dessert desserts={desserts} />
    </>
  );
};

export default DessertList;
