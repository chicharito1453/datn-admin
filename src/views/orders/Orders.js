import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TableDH from "./table/TableDH";
import FormDH from "./form/FormDH";

const initialState = {
  idorder: null,
  total: 0,
  payment: 0,
  status: "0",
  huyen: "",
  xa: "",
  address: "",
  customer: "",
  sdtcustomer: "",
  order_code: "",
  ctv: { username: "", fullname: "Tất cả" },
  ncc: { username: "", nccname: "Tất cả" },
  details: [],
};

const Orders = () => {
  const [show, setShow] = useState(false);
  const [initValue, setInitValue] = useState(initialState);

  function handleClose() {
    setShow(false);
  }

  useEffect(() => {
    document.title = "Quản trị - Đơn hàng";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Đơn hàng</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Tạo đơn hàng
      </Button>
      <br />
      <br />
      <TableDH />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo đơn hàng</Modal.Title>
        </Modal.Header>
        <FormDH close={handleClose} initValue={initValue} />
      </Modal>
    </div>
  );
};
export default Orders;
