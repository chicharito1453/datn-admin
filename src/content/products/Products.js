import Form from "./form/Form";
import Table from "./table/Table";
import { Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";

const Products = () => {
  useEffect(() => {
    document.title = "Product Management";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Sản phẩm</h1>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Form">
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
