import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
// import { connect } from "react-redux";
// import { SET_NCC } from "../../../store/action";
import InputGroup from "../../../components/InputGroup";
import Image from "../../../components/Image";

const FormNcc = ({ close, add }) => {
  const [temp, setTemp] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nccname: "",
    ncclogo: null,
    email: "",
    sdt: "",
    city: "",
    address: "",
    active: null,
    description: "",
    idghn: "",
  });

  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
    setFormData({ ...formData, ncclogo: file });
  }

  function handleChangeNcc(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleActive(e) {
    setFormData({ ...formData, active: e.target.value === "1" });
  }

  useEffect(() => {
    return () => temp && URL.revokeObjectURL(temp); // hủy image tạm
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
            classWraper="col-sm-5"
            src={temp || "/assets/img/default.jpg"}
            text="Chọn hình ảnh"
            idFile="ncclogo"
            idButton="btnLogoNcc"
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
              id="nccForm"
            >
              <InputGroup
                id="username"
                name="username"
                text="Tài khoản"
                value={formData.username}
                changed={handleChangeNcc}
              />
              <InputGroup
                id="password"
                name="password"
                text="Mật khẩu"
                type="password"
                value={formData.password}
                changed={handleChangeNcc}
              />
              <InputGroup
                id="nccname"
                name="nccname"
                text="Tên nhà cung cấp"
                value={formData.nccname}
                changed={handleChangeNcc}
              />
              <InputGroup
                id="email"
                name="email"
                text="Email"
                value={formData.email}
                changed={handleChangeNcc}
              />
              <InputGroup
                id="sdt"
                name="sdt"
                text="SĐT"
                value={formData.sdt}
                changed={handleChangeNcc}
              />
              <InputGroup
                id="city"
                name="city"
                text="Thành phố"
                value={formData.city}
                changed={handleChangeNcc}
              />
              <InputGroup
                id="address"
                name="address"
                text="Địa chỉ"
                value={formData.address}
                changed={handleChangeNcc}
              />
              <InputGroup
                id="idghn"
                name="idghn"
                text="ID giao hàng nhanh (nếu có)"
                value={formData.idghn}
                changed={handleChangeNcc}
              />
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
              <br />
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  style={{ height: 100 }}
                  value={formData.description}
                  onChange={handleChangeNcc}
                ></textarea>
                <label htmlFor="description">Giới thiệu</label>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() =>
            add({
              ...formData,
              username: formData.username.trim(),
              nccname: formData.nccname.trim(),
              email: formData.email.trim(),
              sdt: formData.sdt.trim(),
              city: formData.city.trim(),
              address: formData.address.trim(),
              description: formData.description.trim(),
            })
          }
        >
          Lưu
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
//     formData: state.ncc,
//   };
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     setFormData: (NCC = null) => {
//       dispatch(SET_NCC(NCC));
//     },
//   };
// };

export default FormNcc;
