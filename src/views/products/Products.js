import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import FormSP from "./form/FormSP";
import TableSP from "./table/TableSP";

const Products = () => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  useEffect(() => {
    document.title = "Quản trị - Sản phẩm";
    document.querySelector(".content").style.height = "auto";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Sản phẩm</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Thêm sản phẩm
      </Button>
      <br />
      <br />
      <TableSP />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhà cung cấp</Modal.Title>
        </Modal.Header>
        <FormSP close={handleClose} />
      </Modal>
    </div>
  );
};
export default Products;
