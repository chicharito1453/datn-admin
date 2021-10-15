import Image from "./Image";
import Introduce from "./Introduce";
import InputGroup from "../../../utils/InputGroup";
import Button from "react-bootstrap/Button";

const Form = () => {
  return (
    <div className="row">
      <Image />
      <div className="col">
        <form id="nccForm">
          <InputGroup id="username" text="Tài khoản" element="0" />
          <InputGroup id="hoten" text="Nhà cung cấp" element="0" />
          <InputGroup id="sdt" text="SĐT" element="0" />
          <InputGroup id="diachi" text="Địa chỉ" element="0" />
          <br />
          <Introduce />
          <br />
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
