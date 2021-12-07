import { Tabs, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import Users from "./tabs/Users";
import ProfitYear from "./tabs/ProfitYear";
import OrdersDay from "./tabs/OrdersDay";
import "chart.js/auto";
import "react-chartjs-2";

const Reports = () => {
  const [key, setKey] = useState("orderD");

  function handleKey(k) {
    if (k === "pYear") {
      document.querySelector(".content").style.height = "auto";
    } else {
      document.querySelector(".content").style.height =
        window.innerHeight - 60 + "px";
    }
    setKey(k);
  }

  useEffect(() => {
    document.title = "Thống kê";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
  }, []);

  return (
    <div className="container">
      <div className="row">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={handleKey}
          className="mb-3"
        >
          <Tab eventKey="orderD" title="Đơn hàng theo ngày">
            <OrdersDay />
          </Tab>
          <Tab eventKey="users" title="Người dùng">
            <Users />
          </Tab>
          <Tab eventKey="pYear" title="Doanh thu năm">
            <ProfitYear />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default Reports;
