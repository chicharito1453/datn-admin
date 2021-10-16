import Form from "./form/Form";
import Details from "./table/Details";
import TableList from "./table/TableList";
import { Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";

const Orders = () => {
  useEffect(() => {
    document.title = "Quản trị - Đơn hàng";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Đơn hàng</h1>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Chi tiết">
          <div className="row">
            <Form />
          </div>
          <div className="row">
            <Details />
          </div>
        </Tab>
        <Tab eventKey="profile" title="Danh sách">
          <div className="row">
            <TableList />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
export default Orders;
