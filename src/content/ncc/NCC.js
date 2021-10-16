import Form from "./form/Form";
import Table from "./table/Table";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useState } from "react";

const NCC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.title = "Quản trị - Nhà cung cấp";

    // Resize lại trang khi form xuất hiện
    document.querySelector("#showNCC").onclick = function () {
      var height = document.querySelector(".content").style.height;
      document.querySelector(".content").style.height =
        height === "100vh" ? "auto" : "100vh";
      console.log(document.querySelector(".content").style.height);
      window.onresize = function () {}; // Tắt hàm resize content
    };
  }, []);

  function handleShow() {
    setShow(!show);
  }

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhà cung cấp</h1>
      <Button
        style={{ float: "right" }}
        id="showNCC"
        variant="primary"
        onClick={handleShow}
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
