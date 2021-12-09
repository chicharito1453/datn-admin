import { useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FormLoai from "./form/FormLoai";
import TableLoai from "./table/TableLoai";
import okteamAPI from "../../utils/api/okteamAPI";
import okteam_upload from "../../utils/api/okteam_upload";
import { Fail, Success, Approve, isOK } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import { ALL_CATEGORIES } from "../../store/action/index";

const Categories = ({ data, getAllCategories }) => {
  const [show, setShow] = useState(false);

  // DANH SÁCH LOẠI
  const list_loai = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/category/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      getAllCategories([]);
      document.querySelector(".content").style.height = "auto";
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    getAllCategories(result);
    document.querySelector(".content").style.height = "auto";
    return true;
  }, [getAllCategories]);

  // CHECK LỖI FORM
  function check_form(formData) {
    if (!formData.idcate.trim()) {
      Fail("Chưa nhập mã loại!");
      return false;
    }
    if (!formData.typename.trim()) {
      Fail("Chưa nhập tên loại!");
      return false;
    }
    if (!formData.lv.value) {
      Fail("Chưa chọn cấp menu!");
      return false;
    }
    return true;
  }

  // THÊM LOẠI
  async function them_loai(formData) {
    if (!check_form(formData)) return false;
    // check idcate truoc khi upload anh
    if (formData.img) {
      const [error, resp] = await okteamAPI(
        `/category/check-id/${formData.idcate}`
      );
      if (error) {
        Fail("Không thực hiện được thao tác!");
        console.log(error);
        return false;
      }
      if (resp.data) {
        Fail("Mã loại đã tồn tại, vui lòng chọn mã khác!");
        return false;
      }
    }
    if (!formData.parent) formData.parent = null;
    formData.lv = formData.lv.value;
    fetchingOn();
    // upload hinh anh
    if (formData.img) {
      const [error, resp] = await okteam_upload(formData.img);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.img = resp.data.secure_url;
    }
    // them
    const [error, resp] = await okteamAPI("/category/add", "POST", formData);
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    Success("Thêm loại thành công!");
    setShow(false);
    getAllCategories(result);
    return true;
  }

  // XÓA LOẠI
  async function delete_loai(category) {
    Approve(
      "Bạn đang thực hiện xóa Loại hàng này.\nTiếp tục thực hiện ?",
      async () => {
        fetchingOn();
        const [error, resp] = await okteamAPI(
          `/category/delete?idcate=${category.idcate}`,
          "DELETE"
        );
        if (error) {
          fetchingOff();
          Fail("Không thực hiện được thao tác!");
          console.log(error);
          return false;
        }
        const { result, message } = resp.data;
        if (!isOK(message)) {
          fetchingOff();
          Fail(message);
          return false;
        }
        fetchingOff();
        Success("Loại hàng đã được xóa!");
        getAllCategories(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Loại sản phẩm";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    list_loai();
  }, [list_loai]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Loại sản phẩm</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Thêm loại sản phẩm
      </Button>
      <br />
      <br />
      <TableLoai data={data} deleted={delete_loai} />
      <Modal
        show={show}
        centered
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm loại sản phẩm</Modal.Title>
        </Modal.Header>
        <FormLoai add={them_loai} close={() => setShow(false)} />
      </Modal>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.categories,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllCategories: (list) => {
      dispatch(ALL_CATEGORIES(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Categories);
