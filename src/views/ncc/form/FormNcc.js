import { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import callAPI from "../../../utils/api/callAPI";
import { Fail } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";
import InputGroup from "../../../components/InputGroup";
import Image from "../../../components/Image";

const FormNcc = ({ close, saveAll, initValue, isUpdate }) => {
  const [temp, setTemp] = useState(initValue.ncclogo);
  const [cities, setCities] = useState(null);
  const [formData, setFormData] = useState(initValue);

  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
    setFormData({ ...formData, ncclogo: file });
  }

  function handleChangeNcc(e) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "username" ? e.target.value.trim() : e.target.value,
    });
  }

  function handleActive(e) {
    setFormData({ ...formData, active: e.target.value === "1" });
  }

  function handleSelect(e) {
    setFormData({ ...formData, city: e.value });
  }

  // select tỉnh
  const select_tinh = useCallback(async () => {
    if (!isUpdate) fetchingOn();
    const [error, resp] = await callAPI(process.env.REACT_APP_URL_TINH);
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    fetchingOff();
    setCities([
      { value: "--Chọn tỉnh/TP--", label: "--Chọn tỉnh/TP--" },
      ...resp.data.data.map((rs) => ({
        value: rs.ProvinceName,
        label: rs.ProvinceName,
      })),
    ]);
  }, [isUpdate]);

  // rút gọn form data
  function compactFormData() {
    return {
      ...formData,
      fullname: formData.fullname.trim(),
      nccname: formData.nccname.trim(),
      email: formData.email.trim(),
      sdt: formData.sdt.trim(),
      city: formData.city.trim(),
      address: formData.address.trim(),
      description: formData.description.trim().replace(/\r\n|\r|\n/g, "<br />"),
    };
  }

  useEffect(() => {
    select_tinh();
    return () => temp && URL.revokeObjectURL(temp); // hủy image tạm
  }, [temp, select_tinh]);

  return (
    <>
      <Modal.Body>
        <div className="row">
          <Image
            cssImage={{
              marginTop: 30,
              height: "35%",
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
                disabled={isUpdate}
                value={formData.username}
                changed={handleChangeNcc}
              />
              {!isUpdate && (
                <InputGroup
                  id="password"
                  name="password"
                  text="Mật khẩu"
                  type="password"
                  value={formData.password}
                  changed={handleChangeNcc}
                />
              )}
              <InputGroup
                id="fullname"
                name="fullname"
                text="Họ tên"
                value={formData.fullname}
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
                type="select"
                name="city"
                text="Tỉnh/TP"
                options={cities}
                value={{ value: formData.city, label: formData.city }}
                changed={handleSelect}
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
        {!isUpdate ? (
          <Button
            variant="primary"
            onClick={() => saveAll(compactFormData(), "/ncc/add", "POST")}
          >
            Lưu
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => saveAll(compactFormData(), "/ncc/update-all", "PUT")}
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

export default FormNcc;
