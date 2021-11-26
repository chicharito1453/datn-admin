import { useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_CTV, SET_CTV } from "../../store/action/index";
import { regexEmail, regexSDT } from "../../utils/regex/regex";
import okteamAPI from "../../utils/api/okteamAPI";
import okteam_upload from "../../utils/api/okteam_upload";
import { Fail, isOK, Success, Approve } from "../../utils/sweetalert2/alert";
import TableCtv from "./table/TableCtv";
import FormCtv from "./form/FormCtv";

const CTV = ({ data, getAllCtv, formData, setFormData }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setFormData();
    setShow(false);
  }

  // CHECK LỖI FORM
  function check_form() {
    if (!formData.username.trim()) {
      Fail("Chưa nhập tài khoản!");
      return false;
    }
    if (!formData.password.trim()) {
      Fail("Mật khẩu không hợp lệ!");
      return false;
    }
    if (!formData.fullname.trim()) {
      Fail("Chưa nhập họ tên!");
      return false;
    }
    if (!regexEmail.test(formData.email.trim())) {
      Fail("Email không hợp lệ!");
      return false;
    }
    if (!regexSDT.test(formData.sdt.trim())) {
      Fail("Số điện thoại không hợp lệ!");
      return false;
    }
    if (!formData.address.trim()) {
      Fail("Chưa nhập địa chỉ!");
      return false;
    }
    if (!formData.sex) {
      Fail("Chưa chọn giới tính!");
      return false;
    }
    if (formData.active == null) {
      Fail("Chưa chọn trạng thái!");
      return false;
    }
    return true;
  }

  // DANH SÁCH CỘNG TÁC VIÊN
  const list_Ctv = useCallback(async () => {
    const [error, resp] = await okteamAPI("/ctv/list");
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
    getAllCtv(result);
    document.querySelector(".content").style.height = "auto";
  }, [getAllCtv]);

  // THÊM CỘNG TÁC VIÊN
  async function them_ctv() {
    if (!check_form()) return false;
    // upload hinh anh
    if (formData.image) {
      const [error, resp] = await okteam_upload(formData.image);
      if (error) {
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.image = resp.data.secure_url;
    }
    // them
    const [error, resp] = await okteamAPI("/ctv/add", "POST", formData);
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
    Success("Thêm cộng tác viên thành công!");
    setShow(false);
    getAllCtv(result);
    return true;
  }

  // XÓA CỘNG TÁC VIÊN
  async function delete_ctv(Ctv) {
    Approve(
      "Bạn đang thực hiện xóa cộng tác viên này.\nTiếp tục thực hiện ?",
      async () => {
        const [error, resp] = await okteamAPI("/ctv/delete", "DELETE", Ctv);
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
        Success("Xóa nhà cung cấp thành công!");
        getAllCtv(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Cộng tác viên";
    list_Ctv();
  }, [list_Ctv]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Cộng tác viên</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Thêm cộng tác viên
      </Button>
      <br />
      <br />
      <TableCtv data={data} deleted={delete_ctv} />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm cộng tác viên</Modal.Title>
        </Modal.Header>
        <FormCtv add={them_ctv} close={handleClose} />
      </Modal>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.list_Ctv,
    formData: state.ctv,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllCtv: (list) => {
      dispatch(ALL_CTV(list));
    },
    setFormData: (CTV = null) => {
      dispatch(SET_CTV(CTV));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(CTV);
