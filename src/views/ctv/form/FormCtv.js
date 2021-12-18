import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Image from "../../../components/Image";
import InputGroup from "../../../components/InputGroup";

const FormCtv = ({ close, saveAll, initValue, isUpdate }) => {
  const [temp, setTemp] = useState(initValue.image);
  const [formData, setFormData] = useState(initValue);

  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  }

  function handleChangeCtv(e) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "username" ? e.target.value.trim() : e.target.value,
    });
  }

  function handleActive(e) {
    setFormData({ ...formData, active: e.target.value === "1" });
  }

  // rút gọn form data
  function compactFormData() {
    return {
      ...formData,
      password: formData.password.trim(),
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      sdt: formData.sdt.trim(),
      address: formData.address.trim(),
    };
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
              width: "95%",
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
                disabled={isUpdate}
                value={formData.username}
                changed={handleChangeCtv}
              />
              {!isUpdate && (
                <InputGroup
                  id="password"
                  name="password"
                  text="Mật khẩu"
                  type="password"
                  value={formData.password}
                  changed={handleChangeCtv}
                />
              )}
              <InputGroup
                id="fullname"
                name="fullname"
                text="Họ tên"
                value={formData.fullname}
                changed={handleChangeCtv}
              />
              <InputGroup
                id="email"
                name="email"
                text="Email"
                type="email"
                value={formData.email}
                changed={handleChangeCtv}
              />
              <InputGroup
                id="sdt"
                name="sdt"
                text="SĐT"
                value={formData.sdt}
                changed={handleChangeCtv}
              />
              <InputGroup
                id="address"
                name="address"
                text="Địa chỉ"
                value={formData.address}
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
                  isChecked={formData.sex === "Nam" && "checked"}
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
                  isChecked={formData.sex === "Nữ" && "checked"}
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
                  isChecked={formData.sex === "Khác" && "checked"}
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
                  isChecked={formData.active && "checked"}
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
                  isChecked={!formData.active && "checked"}
                  changed={handleActive}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {!isUpdate ? (
          <Button
            variant="primary"
            onClick={() => saveAll(compactFormData(), "/ctv/add", "POST")}
          >
            Thêm
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => saveAll(compactFormData(), "/ctv/update-all", "PUT")}
          >
            Sửa
          </Button>
        )}
        <Button variant="secondary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </>
  );
};
export default FormCtv;
