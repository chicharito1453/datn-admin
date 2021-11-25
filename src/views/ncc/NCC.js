import { useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FormNcc from "./form/FormNcc";
import TableNcc from "./table/TableNcc";
import { regexEmail, regexSDT } from "../../utils/regex/regex";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, isOK } from "../../utils/sweetalert2/alert";
import { ALL_NCC, SET_NCC } from "../../store/action";

const NCC = ({ data, getAllNCC, setFormData, formData }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setFormData();
    setShow(false);
  }

  // DANH SÁCH LOẠI
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
      Fail("Chưa nhập mật khẩu!");
      return false;
    }
    if (!formData.nccname.trim()) {
      Fail("Chưa nhập tên nhà cung cấp!");
      return false;
    }
    if (!formData.email.trim()) {
      Fail("Chưa nhập Email!");
      return false;
    }
    if (!regexEmail.test(formData.email.trim())) {
      Fail("Email chưa đúng định dạng!");
      return false;
    }
    if (!formData.sdt.trim()) {
      Fail("Chưa nhập số điện thoại!");
      return false;
    }
    if (!regexSDT.test(formData.sdt.trim())) {
      Fail("Số điện thoại chưa đúng định dạng!");
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
    return true;
  }

  // THÊM NHÀ CUNG CẤP
  async function them_ncc() {
    if (!check_form()) return false;
    console.log("ok");
  }

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Nhà cung cấp";
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
        Thêm Nhà cung cấp
      </Button>
      <br />
      <br />
      <TableNcc data={data} />
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

const mapDispatchToProps = (dispath, props) => {
  return {
    getAllNCC: (list) => {
      dispath(ALL_NCC(list));
    },
    setFormData: (NCC = null) => {
      dispath(SET_NCC(NCC));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(NCC);
