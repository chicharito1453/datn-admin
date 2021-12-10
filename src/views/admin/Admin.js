import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useJwt } from "react-jwt";
import FormAdmin from "./form/FormAdmin";
import TableAdmin from "./table/TableAdmin";
import { ALL_ADMIN } from "../../store/action/index";
import { Fail, isOK, Success, Approve } from "../../utils/sweetalert2/alert";
import okteamAPI from "../../utils/api/okteamAPI";
import okteam_upload from "../../utils/api/okteam_upload";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import {
  getToken,
  getFromLS,
  saveToLS,
} from "../../utils/localStorage/localStorage";
import { regexEmail, regexSDT } from "../../utils/regex/regex";

const initialState = {
  username: "",
  password: "",
  fullname: "",
  image: null,
  email: "",
  sdt: "",
  address: "",
  active: false,
  sex: null,
};

const Admin = ({ data, getAllAdmin }) => {
  const [show, setShow] = useState(false);
  const [initValue, setInitValue] = useState(initialState);
  const [isUpdate, setisUpdate] = useState(false);
  const { decodedToken } = useJwt(getToken());

  function handleClose() {
    setInitValue(initialState);
    setShow(false);
  }

  // DANH SÁCH ADMIN
  const list_admin = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI(`/admin/list`);
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      getAllAdmin([]);
      document.querySelector(".content").style.height = "auto";
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    getAllAdmin(result);
    document.querySelector(".content").style.height = "auto";
  }, [getAllAdmin]);

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
  async function saveAll(formData, endpoint, method) {
    if (!check_form(formData)) return false;
    // check username truoc khi upload anh
    if (formData.image && !isUpdate) {
      const [error, resp] = await okteamAPI(
        `/admin/check-id/${formData.username}`
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
    // upload anh
    if (formData.image && typeof formData.image !== "string") {
      const [error, resp] = await okteam_upload(formData.image);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.image = resp.data.secure_url;
      fetchingOff();
    }
    // them
    const [error, resp] = await okteamAPI(endpoint, method, formData);
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, object, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    Success(
      method === "POST"
        ? "Thêm quản trị viên thành công!"
        : "Cập nhật thông tin thành công!"
    );
    if (method === "PUT") {
      const { jti } = decodedToken;
      if (jti === object.username) {
        saveToLS({ ...getFromLS(), image: object.image });
        document.querySelector(".profile_image").src =
          object.image || "/assets/img/avatar.png";
      }
    }
    getAllAdmin(result);
    setShow(false);
    return true;
  }

  // XÓA ADMIN
  async function delete_admin(admin) {
    Approve(
      "Bạn đang thực hiện xóa quản trị viên này.\nTiếp tục thực hiện ?",
      async () => {
        if (!admin) return false;
        const { jti } = decodedToken;
        if (jti === admin.username) {
          Fail("Không thể xóa chính bạn!");
          return false;
        }
        fetchingOn();
        const [error, resp] = await okteamAPI("/admin/delete", "DELETE", admin);
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
        Success("Xóa quản trị viên thành công!");
        getAllAdmin(result);
        return true;
      }
    );
  }

  // đổ dữ liệu lên form
  async function mapRowToForm(admin) {
    if (!admin) return;
    setisUpdate(true);
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/admin/getone?username=${admin.username}`
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, object, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    object.password = "updating";
    setInitValue(object);
    getAllAdmin(result);
    setShow(true);
  }

  useEffect(() => {
    document.title = "Quản trị - Admin";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    list_admin();
  }, [list_admin]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Quản trị viên</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => {
          setisUpdate(false);
          setShow(true);
        }}
      >
        Thêm Quản trị viên
      </Button>
      <br />
      <br />
      <TableAdmin data={data} deleted={delete_admin} getRow={mapRowToForm} />
      <Modal
        size="lg"
        show={show}
        centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!isUpdate ? "Thêm" : "Cập nhật"} quản trị viên
          </Modal.Title>
        </Modal.Header>
        <FormAdmin
          close={handleClose}
          saveAll={saveAll}
          initValue={initValue}
          isUpdate={isUpdate}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.list_admin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllAdmin: (list) => {
      dispatch(ALL_ADMIN(list));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
