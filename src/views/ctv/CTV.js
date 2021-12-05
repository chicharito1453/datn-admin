import { useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_CTV } from "../../store/action/index";
import { regexEmail, regexSDT } from "../../utils/regex/regex";
import okteamAPI from "../../utils/api/okteamAPI";
import okteam_upload from "../../utils/api/okteam_upload";
import { Fail, isOK, Success, Approve } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import TableCtv from "./table/TableCtv";
import FormCtv from "./form/FormCtv";

const CTV = ({ data, getAllCtv }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  // CHECK LỖI FORM
  function check_form(formData) {
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
    return true;
  }

  // DANH SÁCH CỘNG TÁC VIÊN
  const list_Ctv = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/ctv/list");
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
    getAllCtv(result);
    document.querySelector(".content").style.height = "auto";
  }, [getAllCtv]);

  // THÊM CỘNG TÁC VIÊN
  async function them_ctv(formData) {
    if (!check_form(formData)) return false;
    // check username truoc khi upload anh
    if (formData.image) {
      const [error, resp] = await okteamAPI(
        `/ctv/check-id/${formData.username}`
      );
      if (error) {
        Fail("Không thực hiện được thao tác!");
        console.log(error);
        return false;
      }
      if (resp.data) {
        Fail("Tài đã tồn tại, vui lòng chọn tên khác!");
        return false;
      }
    }
    fetchingOn();
    // upload hinh anh
    if (formData.image) {
      const [error, resp] = await okteam_upload(formData.image);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.image = resp.data.secure_url;
    }
    // them
    const [error, resp] = await okteamAPI("/ctv/add", "POST", formData);
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
        fetchingOn();
        const [error, resp] = await okteamAPI("/ctv/delete", "DELETE", Ctv);
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
        Success("Xóa nhà cung cấp thành công!");
        getAllCtv(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Cộng tác viên";
    document.querySelector(".content").style.height = "100vh";
    list_Ctv();
  }, [list_Ctv]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Cộng tác viên</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Thêm cộng tác viên
      </Button>
      <br />
      <br />
      <TableCtv data={data} deleted={delete_ctv} />
      <Modal
        size="lg"
        show={show}
        centered
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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllCtv: (list) => {
      dispatch(ALL_CTV(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(CTV);
