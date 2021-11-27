import { memo, useState } from "react";
import InputGroup from "../../../components/InputGroup";
import Button from "react-bootstrap/Button";

const FormNhan = ({ options, changed, add }) => {
  const [formData, setFormData] = useState({ id: null, name: "" });

  return (
    <form id="formNhan" className="row row-cols-lg-auto g-3 align-items-center">
      <div style={{ width: 300 }} className="col-12">
        <InputGroup
          id="select-loai"
          type="select"
          text="Loại hàng"
          placeholder="Tên loại"
          options={options}
          changed={changed}
        />
      </div>
      <div style={{ width: 500 }} className="col-12">
        <InputGroup
          id="name"
          text="Tên nhãn hàng"
          value={formData.name}
          changed={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nhập tên nhãn hàng"
        />
      </div>
      <div className="col-12">
        <div style={{ marginTop: 28 }} className="btnForm">
          <Button
            variant="primary"
            onClick={() =>
              add({ ...formData, name: formData.name.trim() }, setFormData)
            }
          >
            Thêm
          </Button>
        </div>
      </div>
    </form>
  );
};
export default memo(FormNhan);
