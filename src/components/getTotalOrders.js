import React, { useEffect, useState } from "react";
import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const GetTotalOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let recordsArray = [];

    base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        recordsArray = [...recordsArray, ...records];
        setOrders(recordsArray);

        console.log(records);
        fetchNextPage();
      });
  }, []);

  return (
    <>
      <h2>Total Orders</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Customer name</th>
            <th>Order ID</th>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={order.id}>
                <td>{index + 1}</td>

                <td>
                  {order.get("first_name")} {order.get("last_name")}
                </td>
                <td>{order.get("order_id")}</td>
                <td>{order.get("product_name")}</td>
                <td>£{order.get("price")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default GetTotalOrders;
