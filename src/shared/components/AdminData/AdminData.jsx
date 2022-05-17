import React, { useState } from "react";

import Swal from "sweetalert2";

import axios from "axios";

import "./_AdminData.scss";

const AdminData = ({
  date,
  orderId,
  userId,
  email,
  price,
  status,
  items,
  name,
}) => {
  const [orderStatus, setOrderStatus] = useState(status);
  const [postData, setPostData] = useState({});

  const initialState =
    status === "Accepted" ? null : status === "In Process" ? "yellow" : "green";

  const [color, setColor] = useState(initialState);

  let differentStatus = ["Accepted", "In Process", "Delivered"];

  const postStatus = async (data) => {
    const { Id, state } = data;

    try {
      const response = await axios.post("http://localhost:8000/api/status", {
        state,
        Id,
      });

      if (response.status === 201) {
        Swal.fire("Ok Updated State");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeColor = (estado) => {
    if (estado === "Delivered") {
      setColor("green");
    } else if (estado === "In Process") {
      setColor("yellow");
    } else {
      setColor(null);
    }
  };

  return (
    <tr className="adminData">
      <td>
        <h2>{date}</h2>
      </td>
      <td>
        <h2>{orderId}</h2>
      </td>
      <td>
        <h2>{userId}</h2>
      </td>
      <td>
        <h2>{email}</h2>
      </td>

      
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
      <td><h2>{price.toFixed(2)} Euros</h2></td>

      <td>
       <h2><select
          className="select"
          value={orderStatus}
          onChange={(e) => {
            setOrderStatus(e.target.value);

            setPostData({
              ...postData,
              Id: orderId,
              state: e.target.value,
            });

            // postStatus(orderId, e.target.value)

            console.log(orderId);
          }}
        >
          {differentStatus.map((status, index) => {
            return (
              <option key={index} value={status}>
                {status}
              </option>
            );
          })}
          </select></h2>
      </td>
      <td>
       <h2><button
          onClick={() => {
            postStatus(postData);
            changeColor(orderStatus);
          }}
          className={color}
        >
          Submit
        </button></h2> 
      </td>
    </tr>
  );
};

export default AdminData;
