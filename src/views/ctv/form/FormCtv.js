import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
// import { connect } from "react-redux";
// import { SET_CTV } from "../../../store/action/index";
import Image from "../../../components/Image";
import InputGroup from "../../../components/InputGroup";

const FormCtv = ({ close, add }) => {
  const [temp, setTemp] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    image: null,
    email: "",
    sdt: "",
    address: "",
    active: null,
    sex: null,
  });

  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  }

  function handleChangeCtv(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  }

  function handleActive(e) {
    setFormData({ ...formData, active: e.target.value === "1" });
  }

  useEffect(() => {
    return () => temp && URL.revokeObjectURL(temp);
  }, [temp]);

  return (
    <>
      <Modal.Body>
        <div className="row">
          <Image
            cssImage={{
              marginTop: 30,
              height: "45%",
              width: "90%",
              float: "right",
            }}
            classImg=".img-fluid"
            classWraper="col-sm-5"
            src={temp || "/assets/img/default.jpg"}
            text="Chọn hình ảnh"
            idFile="image"
            idButton="btnImage"
            classButton="danger"
            changed={handleImage}
          />
          <div className="col">
            <form
              style={{
                fontSize: 15,
                width: "60%",
                height: "80%",
                marginLeft: "10%",
              }}
              id="ctvForm"
            >
              <InputGroup
                id="username"
                name="username"
                text="Tài khoản"
                changed={handleChangeCtv}
              />
              <InputGroup
                id="password"
                name="password"
                text="Mật khẩu"
                type="password"
                changed={handleChangeCtv}
              />
              <InputGroup
                id="fullname"
                name="fullname"
                text="Họ tên"
                changed={handleChangeCtv}
              />
              <InputGroup
                id="email"
                name="email"
                text="Email"
                type="email"
                changed={handleChangeCtv}
              />
              <InputGroup
                id="sdt"
                name="sdt"
                text="SĐT"
                changed={handleChangeCtv}
              />
              <InputGroup
                id="address"
                name="address"
                text="Địa chỉ"
                changed={handleChangeCtv}
              />
              <br />
              <div className="col">
                <label htmlFor="nam" className="form-label">
                  <b>Giới tính</b>
                </label>
                <br />
                <InputGroup
                  nameClass="form-check form-check-inline"
                  id="nam"
                  name="sex"
                  text="Nam"
                  value="Nam"
                  labelClass="form-check-label"
                  elementClass="form-check-input"
                  type="radio"
                  changed={handleChangeCtv}
                />
                <InputGroup
                  nameClass="form-check form-check-inline"
                  id="nu"
                  name="sex"
                  text="Nữ"
                  value="Nữ"
                  labelClass="form-check-label"
                  elementClass="form-check-input"
                  type="radio"
                  changed={handleChangeCtv}
                />
                <InputGroup
                  nameClass="form-check form-check-inline"
                  id="khac"
                  name="sex"
                  text="Khác"
                  value="Khác"
                  labelClass="form-check-label"
                  elementClass="form-check-input"
                  type="radio"
                  changed={handleChangeCtv}
                />
              </div>
              <br />
              <div className="col">
                <label htmlFor="active" className="form-label">
                  <b>Trạng thái</b>
                </label>
                <br />
                <InputGroup
                  nameClass="form-check form-check-inline"
                  id="active"
                  name="active"
                  text="Kích hoạt"
                  value="1"
                  labelClass="form-check-label"
                  elementClass="form-check-input"
                  type="radio"
                  changed={handleActive}
                />
                <InputGroup
                  nameClass="form-check form-check-inline"
                  id="nonactive"
                  name="active"
                  text="Vô hiệu"
                  value="0"
                  labelClass="form-check-label"
                  elementClass="form-check-input"
                  type="radio"
                  changed={handleActive}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => add(formData)}>
          Thêm
        </Button>
        <Button variant="secondary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </>
  );
};

// const mapStatetoProps = (state) => {
//   return {
//     formData: state.ctv,
//   };
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     setFormData: (CTV = null) => {
//       dispatch(SET_CTV(CTV));
//     },
//   };
// };

export default FormCtv;
