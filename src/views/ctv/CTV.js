import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import TableCtv from "./table/TableCtv";
import FormCtv from "./form/FormCtv";

const CTV = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Cộng tác viên";
    document.querySelector(".content").style.height = "auto";
  }, []);

  function handleClose() {
    setShow(false);
  }

  return (
    <div className="container">
      <h1 className="hit-the-floor">Cộng tác viên</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Thêm cộng tác viên
      </Button>
      <br />
      <br />
      <TableCtv />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm cộng tác viên</Modal.Title>
        </Modal.Header>
        <FormCtv close={handleClose} />
      </Modal>
    </div>
  );
};
export default CTV;
