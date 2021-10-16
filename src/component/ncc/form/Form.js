import ImageNcc from "./ImageNcc";
import Introduce from "./Introduce";
import InputGroup from "../../../utils/InputGroup";
import Button from "react-bootstrap/Button";

const Form = () => {
  return (
    <div className="row">
      <ImageNcc />
      <div className="col">
        <form id="nccForm">
          <InputGroup id="username" text="Tài khoản" />
          <InputGroup id="password" text="Mật khẩu" type="password" />
          <InputGroup id="hoten" text="Nhà cung cấp" />
          <InputGroup id="sdt" text="SĐT" />
          <InputGroup id="diachi" text="Địa chỉ" />
          <br />
          <Introduce />
          <br />
          <div className="btnForm">
            <Button variant="primary">Lưu</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
