import ImageCTV from "./ImageCtv";
import Button from "react-bootstrap/Button";
import InputGroup from "../../../utils/InputGroup";

const Form = () => {
  return (
    <div className="row">
      <ImageCTV />
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
          <InputGroup id="username" text="Tài khoản" />
          <InputGroup id="password" text="Mật khẩu" type="password" />
          <InputGroup id="hoten" text="Họ tên" />
          <InputGroup id="email" text="Email" type="email" />
          <InputGroup id="sdt" text="SĐT" />
          <InputGroup id="diachi" text="Địa chỉ" />
          <br />
          <div className="col-md-6">
            <label htmlFor="nam" className="form-label">
              <b>Giới tính</b>
            </label>
            <br />
            <InputGroup
              nameClass="mb-3 form-check form-check-inline"
              id="nam"
              name="gioitinh"
              text="Nam"
              value="1"
              labelClass="form-check-label"
              elementClass="form-check-input"
              type="radio"
            />
            <InputGroup
              nameClass="mb-3 form-check form-check-inline"
              id="nu"
              name="gioitinh"
              text="Nữ"
              value="0"
              labelClass="form-check-label"
              elementClass="form-check-input"
              type="radio"
            />
          </div>
          <div className="btnForm">
            <Button type="reset" variant="primary">
              Mới
            </Button>
            <Button type="button" variant="primary">
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
