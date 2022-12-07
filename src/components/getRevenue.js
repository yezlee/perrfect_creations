import React, { useEffect, useState } from "react";
import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const GetRevenue = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let recordsArray = [];

    base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
      .select({})
      .eachPage((records, fetchNextPage) => {
        recordsArray = [...recordsArray, ...records];
        setOrders(recordsArray);

        fetchNextPage();
      });
  }, []);

  let orderArr = orders.map((order) => {
    return order.fields.price;
  });

  let sum = 0;

  orderArr.forEach((value) => {
    sum += value;
  });

  return (
    <>
      <h2>Revenue</h2>
      <p>{sum.toFixed(2)}</p>
    </>
  );
};

export default GetRevenue;
