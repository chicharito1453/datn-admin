import Table from "./table/Table";
import Form from "./form/Form";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useState } from "react";

const CTV = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Cộng tác viên";

    // Resize sử dụng show làm dependencies
    window.onresize = function () {};
    document.querySelector(".content").style.height = show ? "auto" : "100vh";
  }, [show]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Cộng tác viên</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        {!show ? "Thêm cộng tác viên" : "Đóng"}
      </Button>
      {show && <Form />}
      <br />
      <br />
      <Table />
    </div>
  );
};
export default CTV;
