import Form from "./form/Form";
import Table from "./table/Table";
import { Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";

const Products = () => {
  useEffect(() => {
    document.title = "Quản trị - Sản phẩm";
    document.querySelector(".content").style.height = "auto";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Sản phẩm</h1>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab align="center" eventKey="home" title="Form">
          <Form />
          <br />
          <br />
        </Tab>
        <Tab eventKey="profile" title="Danh sách">
          <Table />
        </Tab>
      </Tabs>
    </div>
  );
};
export default Products;
