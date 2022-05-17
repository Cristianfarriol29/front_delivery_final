import AdminData from "../../shared/components/AdminData/AdminData";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./_AdminPage.scss";

//hacer fetch o get con axios de los datos de orders y mapear el componente admindata
//ahora mismo estoy simulando
const AdminPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  const { name, _id } = user;

  console.log(name, _id);
  let userToken = localStorage.getItem("token");

  const [usersOrders, setUsersOrders] = useState([]);

  // console.log("userOrder",usersOrders)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        let orders = response.data;

        setUsersOrders(orders.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userToken]);

  return (
    <div className="body  adminContainer">
      <div className="title-box">
        <h1>USERS ORDERS</h1>
      </div>

      {!usersOrders.length && (
        <div class="container-spinner p-5">
          <h1 class="loading">Loading..</h1>
          <div class="spinner"></div>
        </div>
      )}

      {usersOrders.length > 0 && (
        <table id="customers">
          <tr>
            <th>
              <h2>Order Date</h2>
            </th>
            <th>
              <h2>Order Id</h2>
            </th>
            <th>
              <h2>User Id</h2>
            </th>
            <th>
              <h2>User Email</h2>
            </th>
            <th>
              <h2>Ordered Products</h2>
            </th>
            <th>
              <h2>Total Price</h2>
            </th>
            <th>
              <h2>Order Status</h2>
            </th>
            <th>
              <h2>Submit Order</h2>
            </th>
          </tr>

          {usersOrders.map((order, index) => {
            console.log(order);

            return (
              <AdminData
                key={index}
                items={order.orderedProducts}
                date={order.createdAt.substring(0, 10)}
                orderId={order._id}
                userId={order.userId}
                email={order.email}
                price={order.totalPrice}
                status={order.deliverStatus}
              />
            );
          })}
        </table>
      )}
    </div>
  );
};

export default AdminPage;
