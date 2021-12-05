import { useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FormNcc from "./form/FormNcc";
import TableNcc from "./table/TableNcc";
import { regexEmail, regexSDT } from "../../utils/regex/regex";
import okteamAPI from "../../utils/api/okteamAPI";
import okteam_upload from "../../utils/api/okteam_upload";
import { Approve, Fail, isOK, Success } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import { ALL_NCC } from "../../store/action";

const NCC = ({ data, getAllNCC }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  // DANH SÁCH NHÀ CUNG CẤP
  const list_Ncc = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/ncc/list");
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
    getAllNCC(result);
    document.querySelector(".content").style.height = "auto";
  }, [getAllNCC]);

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
    if (!formData.nccname.trim()) {
      Fail("Chưa nhập tên nhà cung cấp!");
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
    if (!formData.city.trim()) {
      Fail("Chưa nhập thành phố");
      return false;
    }
    if (!formData.address.trim()) {
      Fail("Chưa nhập địa chỉ!");
      return false;
    }
    if (formData.active == null) {
      Fail("Chưa chọn trạng thái!");
      return false;
    }
    return true;
  }

  // THÊM NHÀ CUNG CẤP
  async function them_ncc(formData) {
    if (!check_form(formData)) return false;
    // check username truoc khi upload anh
    if (formData.ncclogo) {
      const [error, resp] = await okteamAPI(
        `/ncc/check-id/${formData.username}`
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
    if (formData.ncclogo) {
      const [error, resp] = await okteam_upload(formData.ncclogo);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.ncclogo = resp.data.secure_url;
    }
    // them
    const [error, resp] = await okteamAPI("/ncc/add", "POST", formData);
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
    Success("Thêm nhà cung cấp thành công!");
    setShow(false);
    getAllNCC(result);
    return true;
  }

  // XÓA NHÀ CUNG CẤP
  async function delete_ncc(Ncc) {
    Approve(
      "Bạn đang thực hiện xóa nhà cung cấp này.\nTiếp tục thực hiện ?",
      async () => {
        fetchingOn();
        const [error, resp] = await okteamAPI("/ncc/delete", "DELETE", Ncc);
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
        getAllNCC(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Nhà cung cấp";
    document.querySelector(".content").style.height = "100vh";
    list_Ncc();
  }, [list_Ncc]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhà cung cấp</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Thêm nhà cung cấp
      </Button>
      <br />
      <br />
      <TableNcc data={data} deleted={delete_ncc} />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhà cung cấp</Modal.Title>
        </Modal.Header>
        <FormNcc add={them_ncc} close={handleClose} />
      </Modal>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.list_Ncc,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllNCC: (list) => {
      dispatch(ALL_NCC(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(NCC);
