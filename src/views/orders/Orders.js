import Form from "./form/Form";
import Details from "./table/Details";
import TableList from "./table/TableList";
import { Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";

const Orders = () => {
  const [show, setShow] = useState(false);

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
        <Tab align="center" eventKey="home" title="Chi tiết">
          <Form xemChiTiet={() => setShow(!show)} />
          <br />
          <br />
          <br />
          {show && <Details />}
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
