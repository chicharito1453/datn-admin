import InputGroup from "../../../common/InputGroup";
import Button from "react-bootstrap/Button";
import { memo } from "react";

const FormNhan = ({ options, changed }) => {
  return (
    <form className="row row-cols-lg-auto g-3 align-items-center">
      <div style={{ width: 200 }} className="col-12">
        <InputGroup
          id="select-loai"
          type="select"
          text="Loại hàng"
          options={options}
          changed={changed}
        />{" "}
      </div>
      <div style={{ width: 500 }} className="col-12">
        <InputGroup
          id="name"
          text="Tên nhãn hàng"
          placeholder="Nhập tên nhãn hàng"
        />
      </div>
      <div className="col-12">
        <div style={{ marginTop: 28 }} className="btnForm">
          <Button variant="primary">Thêm</Button>
        </div>
      </div>
    </form>
  );
};
export default memo(FormNhan);
