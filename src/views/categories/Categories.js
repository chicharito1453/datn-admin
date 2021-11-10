import FormLoai from "./form/FormLoai";
import TableLoai from "./table/TableLoai";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, Success, Approve, isOK } from "../../utils/sweetalert2/alert";
import Button from "react-bootstrap/Button";
import okteam_upload from "../../utils/api/okteam_upload";
import { useLayoutEffect, useState, useCallback } from "react";

const Categories = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(list_loai);

  // RESIZE KHI ĐÓNG MỞ FORM
  const setHeight = useCallback(() => {
    window.onresize = function () {};
    const browserHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;
    const height = contentHeight >= browserHeight ? "auto" : browserHeight + 60;
    document.querySelector(".content").style.height = show
      ? "auto"
      : height + "px";
  }, [show]);

  // DANH SÁCH LOẠI
  async function list_loai() {
    const [error, resp] = await okteamAPI("/category/list");
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
    setData(result);
    return true;
  }

  // THÊM LOẠI
  async function them_loai(formData, setTemp, setFormData) {
    // check
    if (!formData.idcate.trim()) {
      Fail("Chưa nhập mã loại!");
      return false;
    }
    if (!formData.typename.trim()) {
      Fail("Chưa nhập tên loại!");
      return false;
    }
    if (!formData.parent) formData.parent = null;
    // upload hinh anh
    if (formData.img) {
      const [error, resp] = await okteam_upload(formData.img);
      if (error) {
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.img = resp.data.secure_url;
    }
    // them
    const [error, resp] = await okteamAPI("/category/add", "POST", formData);
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
    setFormData({
      idcate: "",
      typename: "",
      img: null,
      parent: "",
    });
    setTemp(null);
    setData(result);
    return true;
  }

  // XÓA LOẠI
  async function delete_loai(category) {
    Approve(
      "Bạn đang thực hiện xóa Loại hàng này.\nTiếp tục thực hiện ?",
      async () => {
        const [error, resp] = await okteamAPI(
          `/category/delete?idcate=${category.idcate}`,
          "DELETE"
        );
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
        Success("Loại hàng đã được xóa!");
        setData(result);
        return true;
      }
    );
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
      {show && <FormLoai add={them_loai} />}
      <br />
      <br />
      <TableLoai data={data} deleted={delete_loai} />
    </div>
  );
};
export default Categories;
