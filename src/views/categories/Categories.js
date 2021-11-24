import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import FormLoai from "./form/FormLoai";
import TableLoai from "./table/TableLoai";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, Success, Approve, isOK } from "../../utils/sweetalert2/alert";
import okteam_upload from "../../utils/api/okteam_upload";

const Categories = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(list_loai);

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
    setShow(false);
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

  useEffect(() => {
    document.title = "Quản trị - Loại hàng";
    const browserHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;
    document.querySelector(".content").style.height =
      contentHeight >= browserHeight ? "auto" : browserHeight + 60 + "px";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Loại sản phẩm</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Thêm loại hàng
      </Button>
      <br />
      <br />
      <TableLoai data={data} deleted={delete_loai} />
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm loại hàng</Modal.Title>
        </Modal.Header>
        <FormLoai add={them_loai} close={() => setShow(false)} />
      </Modal>
    </div>
  );
};
export default Categories;
