import InputGroup from "../../../utils/InputGroup";
import Button from "react-bootstrap/Button";

const Form = () => {
  return (
    <form id="formLoai">
      <InputGroup id="maloai" text="Mã loại" />
      <InputGroup id="tenloai" text="Tên loại" />
      <br />
      <div className="btnForm">
        <Button variant="primary">Thêm</Button>
      </div>
    </form>
  );
};
export default Form;
