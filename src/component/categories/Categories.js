import Form from "./form/Form";
import Table from "./table/Table";
import callAPI from "../../utils/api/callAPI";
import { Fail, Success } from "../../utils/sweetalert/alert";
import { isOK } from "../../common/isOk";
import Button from "react-bootstrap/Button";
import { useLayoutEffect, useState, useCallback } from "react";
import axios from "axios";

const Categories = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(list_loai);

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
  async function them_loai(formData, setTemp) {
    if (formData.idcate.trim() === "") {
      Fail("Chưa nhập mã loại!");
      return false;
    }
    if (formData.typename.trim() === "") {
      Fail("Chưa nhập tên loại!");
      return false;
    }
    if (!formData.parent) formData.parent = null;
    if (formData.img) {
      const dataImage = new FormData();
      dataImage.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      dataImage.append("file", formData.img);
      await axios
        .post(process.env.REACT_APP_UPLOAD_URL, dataImage)
        .then((resp) => {
          formData.img = resp.data.secure_url;
        });
    }
    const [error, resp] = await callAPI("/category/add", "POST", formData);
    if (error) {
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      Fail(message);
      return false;
    }
    Success("Thêm loại thành công!");
    document.querySelector("#formLoai").reset();
    setTemp(null);
    setData(result);
    return true;
  }

  useLayoutEffect(() => {
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
      {show && <Form add={them_loai} />}
      <br />
      <br />
      <Table data={data} />
    </div>
  );
};
export default Categories;
