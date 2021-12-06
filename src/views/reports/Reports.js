import { Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";
import Users from "./tabs/Users";
import ProfitProducts from "./tabs/ProfitProducts";
import OrdersDay from "./tabs/OrdersDay";
import "chart.js/auto";
import "react-chartjs-2";

const Reports = () => {
  useEffect(() => {
    document.title = "Thống kê";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
  }, []);

  return (
    <div className="container">
      <div className="row">
        <Tabs
          defaultActiveKey="orderD"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="orderD" title="Đơn hàng theo ngày">
            <OrdersDay />
          </Tab>
          <Tab eventKey="users" title="Người dùng">
            <Users />
          </Tab>
          <Tab eventKey="contact" title="Doanh thu năm">
            <ProfitProducts />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default Reports;
