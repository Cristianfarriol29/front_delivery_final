import React from "react";
import "./_ClientOrder.scss";

const ClientOrder = ({
  items,
  address,
  date,
  trasactionId,
  OrderId,
  status,
}) => {
  const initialColor =
    status === "Accepted" ? null : status === "In Process" ? "yellow" : "green";

  //ok cambiado map con cantidad precio y ul por p
  return (
    <tr className="clientOrder">
      <td>
        {items.map((i, index) => {
          return (
            <div>
              <h2 className="bg-dark text-white" key={index}>
                Product name: {i.name}
              </h2>

              <h2>
                <i>Product price: {(i.amount * i.price).toFixed(2)} Euros</i>
              </h2>
            </div>
          );
        })}
      </td>

      <td>
        <h2>{address.street.toUpperCase()}</h2>
        <h2>{address.city.toUpperCase()}</h2>
        <h2>{address.country.toUpperCase()}</h2>
        <h2>{address.postcode}</h2>
      </td>
      <td>
        <h2>{date}</h2>
      </td>
      <td>
        <h2>{trasactionId}</h2>
      </td>
      <td>
        <h2>{OrderId}</h2>
      </td>

      <td className={`${initialColor} text-center`}>
        <h2>{status}</h2>
      </td>
    </tr>
  );
};

export default ClientOrder;
