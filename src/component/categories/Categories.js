import Form from "./form/Form";
import Table from "./table/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState, useCallback } from "react";

const Categories = () => {
  const [show, setShow] = useState(false);
  const setHeight = useCallback(() => {
    // Resize sử dụng show làm dependencies
    window.onresize = function () {};
    document.querySelector(".content").style.height = show
      ? "auto"
      : window.innerHeight - 60 + "px";
  }, [show]);

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Loại hàng";
    setHeight();
  }, [setHeight]);

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
