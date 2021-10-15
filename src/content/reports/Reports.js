import { Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";
import ProfitCategories from "./tabs/ProfitCategories";
import ProfitProducts from "./tabs/ProfitProducts";
import ProfitYears from "./tabs/ProfitYears";

const Reports = () => {
  useEffect(() => {
    document.title = "Report Management";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Thống kê</h1>
      <div className="row">
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Doanh thu loại hàng">
            <ProfitCategories />
          </Tab>
          <Tab eventKey="profile" title="Doanh thu sản phẩm">
            <ProfitProducts />
          </Tab>
          <Tab eventKey="contact" title="Doanh thu năm">
            <ProfitYears />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default Reports;
