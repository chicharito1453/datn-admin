import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import FormQtv from "./form/FormQtv";
import TableQtv from "./table/TableQtv";
import { Fail } from "../../utils/sweetalert2/alert";
import { regexEmail, regexSDT } from "../../utils/regex/regex";

const Admin = () => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  // check form
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

  // THÊM  ADMIN
  async function them_admin(formData) {
    if (!check_form(formData)) return false;
    console.log("ok");
  }

  useEffect(() => {
    document.title = "Quản trị - Admin";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Quản trị viên</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Thêm Quản trị viên
      </Button>
      <br />
      <br />
      <TableQtv />
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
        <FormQtv close={handleClose} add={them_admin} />
      </Modal>
    </div>
  );
};
export default Admin;
