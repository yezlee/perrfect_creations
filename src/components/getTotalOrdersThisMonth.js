import React, { useEffect, useState } from "react";
import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

// const getRecords = async () => {
//   const records = await table.select({ view: "Grid view" }).firstPage();
//   console.log(records);
// };

const GetTotalOrdersThisMonth = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let recordsArray = [];

    base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
      .select({
        filterByFormula: `{order_placed} = "1/10/2021"`,
      })
      .eachPage((records, fetchNextPage) => {
        recordsArray = [...recordsArray, ...records];
        setOrders(recordsArray);

        // console.log(records);
        fetchNextPage();
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Order ID</th>
          <th>First name</th>
          <th>Order date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          return (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.get("order_id")}</td>
              <td>{order.get("first_name")}</td>
              <td>{order.get("order_placed")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GetTotalOrdersThisMonth;
