import React from "react";
import GetOrdersInProgress from "./components/getOrdersInProgress";
import GetTotalOrdersThisMonth from "./components/getTotalOrdersThisMonth";
import GetListOfRecentOrders from "./components/getListOfRecentOrders";
import GetRevenue from "./components/getRevenue";
import GetTotalOrders from "./components/getTotalOrders";
import "./App.css";

// import Order from "./components/Order";

function App() {
  return (
    <div>
      <h1>Purrfect Creations</h1>
      <GetTotalOrders />
      <GetTotalOrdersThisMonth />
      <GetOrdersInProgress />
      <GetListOfRecentOrders />
      <GetRevenue />
      {/* <Test /> */}
    </div>
  );
}

export default App;
