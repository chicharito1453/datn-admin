import Form from "./form/Form";
import Table from "./table/Table";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useState } from "react";

const NCC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Nhà cung cấp";

    // Resize sử dụng show làm dependencies
    window.onresize = function () {};
    document.querySelector(".content").style.height = show ? "auto" : "100vh";
  }, [show]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhà cung cấp</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        {!show ? "Thêm Nhà cung cấp" : "Đóng"}
      </Button>
      {show && <Form />}
      <br />
      <br />
      <Table />
    </div>
  );
};
export default NCC;
