import Image from "./Image";
import Button from "react-bootstrap/Button";
import InputGroup from "../../../utils/InputGroup";

const Form = () => {
  return (
    <div className="row">
      <Image />
      <div className="col">
        <form id="ctvForm">
          <InputGroup nameClass="mb-3" id="username" text="Tài khoản" />
          <InputGroup nameClass="mb-3" id="hoten" text="Họ tên" />
          <InputGroup nameClass="mb-3" id="email" text="Email" type="email" />
          <InputGroup nameClass="mb-3" id="sdt" text="SĐT" />
          <InputGroup nameClass="mb-3" id="diachi" name="Địa chỉ" />
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
