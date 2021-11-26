import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "../../../components/Image";
import InputGroup from "../../../components/InputGroup";

const FormCtv = ({ close }) => {
  const [temp, setTemp] = useState(null);

  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
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
              <InputGroup id="username" name="username" text="Tài khoản" />
              <InputGroup
                id="password"
                name="password"
                text="Mật khẩu"
                type="password"
              />
              <InputGroup id="fullname" name="fullname" text="Họ tên" />
              <InputGroup id="email" name="email" text="Email" type="email" />
              <InputGroup id="sdt" name="sdt" text="SĐT" />
              <InputGroup id="diachi" name="username" text="Địa chỉ" />
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
                />
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Thêm</Button>
        <Button variant="secondary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </>
  );
};
export default FormCtv;
