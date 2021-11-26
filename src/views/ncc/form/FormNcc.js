import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { SET_NCC } from "../../../store/action";
import InputGroup from "../../../components/InputGroup";
import Image from "../../../components/Image";

const FormNcc = ({ close, add, formData, setFormData }) => {
  const [temp, setTemp] = useState(null);

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
    return () => {
      temp && URL.revokeObjectURL(temp); // hủy image tạm
    };
  }, [temp, setFormData]);

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
                changed={handleChangeNcc}
              />
              <InputGroup
                id="password"
                name="password"
                text="Mật khẩu"
                type="password"
                changed={handleChangeNcc}
              />
              <InputGroup
                id="nccname"
                name="nccname"
                text="Tên nhà cung cấp"
                changed={handleChangeNcc}
              />
              <InputGroup
                id="email"
                name="email"
                text="Email"
                changed={handleChangeNcc}
              />
              <InputGroup
                id="sdt"
                name="sdt"
                text="SĐT"
                changed={handleChangeNcc}
              />
              <InputGroup
                id="city"
                name="city"
                text="Thành phố"
                changed={handleChangeNcc}
              />
              <InputGroup
                id="address"
                name="address"
                text="Địa chỉ"
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
                  onChange={handleChangeNcc}
                ></textarea>
                <label htmlFor="description">Giới thiệu</label>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={add}>
          Lưu
        </Button>
        <Button variant="secondary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    formData: state.ncc,
  };
};

const mapDispatchToProps = (dispath, props) => {
  return {
    setFormData: (NCC = null) => {
      dispath(SET_NCC(NCC));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(FormNcc);
