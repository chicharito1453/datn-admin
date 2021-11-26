import { useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FormNcc from "./form/FormNcc";
import TableNcc from "./table/TableNcc";
import { regexEmail, regexSDT } from "../../utils/regex/regex";
import okteamAPI from "../../utils/api/okteamAPI";
import okteam_upload from "../../utils/api/okteam_upload";
import { Approve, Fail, isOK, Success } from "../../utils/sweetalert2/alert";
import { ALL_NCC, SET_NCC } from "../../store/action";

const NCC = ({ data, getAllNCC, setFormData, formData }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setFormData();
    setShow(false);
  }

  // DANH SÁCH NHÀ CUNG CẤP
  const list_Ncc = useCallback(async () => {
    const [error, resp] = await okteamAPI("/ncc/list");
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
    getAllNCC(result);
    document.querySelector(".content").style.height = "auto";
  }, [getAllNCC]);

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
    if (!formData.description.trim()) {
      Fail("Chưa nhập giới thiệu!");
      return false;
    }
    return true;
  }

  // THÊM NHÀ CUNG CẤP
  async function them_ncc() {
    if (!check_form()) return false;
    // upload hinh anh
    if (formData.ncclogo) {
      const [error, resp] = await okteam_upload(formData.ncclogo);
      if (error) {
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.ncclogo = resp.data.secure_url;
    }
    // them
    const [error, resp] = await okteamAPI("/ncc/add", "POST", formData);
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
        const [error, resp] = await okteamAPI("/ncc/delete", "DELETE", Ncc);
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
        getAllNCC(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Nhà cung cấp";
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
    formData: state.ncc,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllNCC: (list) => {
      dispatch(ALL_NCC(list));
    },
    setFormData: (NCC = null) => {
      dispatch(SET_NCC(NCC));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(NCC);
