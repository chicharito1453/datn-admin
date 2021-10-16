import Form from "./form/Form";
import Table from "./table/Table";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useState } from "react";

const Categories = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.title = "Quản trị - Loại hàng";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Loại sản phẩm</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        {!show ? "Thêm loại hàng" : "Đóng"}
      </Button>
      {show && <Form />}
      <br />
      <br />
      <Table />
    </div>
  );
};
export default Categories;
