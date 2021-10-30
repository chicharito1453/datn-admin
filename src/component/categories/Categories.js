import Form from "./form/Form";
import Table from "./table/Table";
import callAPI from "../../utils/api/callAPI";
import { Fail } from "../../utils/sweetalert/alert";
import { isOK } from "../../common/isOk";
import Button from "react-bootstrap/Button";
import React, { useLayoutEffect, useState, useCallback } from "react";

const Categories = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  // RESIZE KHI ĐÓNG MỞ FORM
  const setHeight = useCallback(() => {
    window.onresize = function () {};
    const browserHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;
    const height = contentHeight >= browserHeight ? "auto" : browserHeight + 15;
    document.querySelector(".content").style.height = show
      ? "auto"
      : height + "px";
  }, [show]);

  // DANH SÁCH LOẠI
  async function list_loai() {
    const [error, resp] = await callAPI("/category/list");
    if (error) {
      console.log("Error: lấy danh sách loại bị lỗi");
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      Fail(message);
      return false;
    }
    setData(result);
    return true;
  }

  // THÊM LOẠI
  function them_loai(formData) {
    console.log(formData, formData.image);
  }

  useLayoutEffect(() => {
    if (!document.title) document.title = "Quản trị - Loại hàng";
    setHeight();
    list_loai();
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
      {show && <Form add={them_loai} />}
      <br />
      <br />
      <Table data={data} />
    </div>
  );
};
export default Categories;
