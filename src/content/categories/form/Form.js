import InputGroup from "../../../utils/InputGroup";
import Button from "react-bootstrap/Button";

const Form = () => {
  return (
    <form id="formLoai">
      <InputGroup id="maloai" text="Mã loại" />
      <InputGroup id="tenloai" text="Tên loại" />
      <div className="btnForm">
        <Button variant="primary" type="reset">
          Mới
        </Button>
        <Button variant="primary" type="button">
          Thêm
        </Button>
      </div>
    </form>
  );
};
export default Form;
