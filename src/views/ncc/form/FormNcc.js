import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import InputGroup from "../../../components/InputGroup";
import Image from "../../../components/Image";

const FormNcc = ({ close }) => {
  const [temp, setTemp] = useState(null);

  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
  }

  useEffect(() => {
    return () => {
      temp && URL.revokeObjectURL(temp); // hủy image tạm
    };
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
            idFile="nccLogo"
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
              <InputGroup id="username" text="Tài khoản" />
              <InputGroup id="password" text="Mật khẩu" type="password" />
              <InputGroup id="hoten" text="Nhà cung cấp" />
              <InputGroup id="sdt" text="SĐT" />
              <InputGroup id="city" text="Thành phố" />
              <InputGroup id="diachi" text="Địa chỉ" />
              <br />
              <div className="col">
                <label htmlFor="nam" className="form-label">
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
              <br />
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="gioithieu"
                  style={{ height: 100 }}
                ></textarea>
                <label htmlFor="gioithieu">Giới thiệu</label>
              </div>
              <br />
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Lưu</Button>
        <Button variant="secondary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </>
  );
};
export default FormNcc;
