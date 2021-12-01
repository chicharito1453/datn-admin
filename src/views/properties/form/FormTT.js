import { useState } from "react";
import { Button } from "react-bootstrap";
import InputGroup from "../../../components/InputGroup";

const FormTT = ({ add, options, changed }) => {
  const [formData, setFormData] = useState({ id: null, keyp: "", valuep: "" });

  return (
    <form id="formNhan" className="row row-cols-lg-auto g-3 align-items-center">
      <div style={{ width: 250 }} className="col-12">
        <InputGroup
          id="select-sp"
          type="select"
          text="Loại hàng"
          placeholder="Nhập tên sản phẩm"
          options={options}
          changed={changed}
        />
      </div>
      <div className="col-12">
        <InputGroup
          id="keyp"
          name="keyp"
          text="Tên"
          placeholder="Nhập tên thuộc tính"
          value={formData.keyp}
          changed={(e) => setFormData({ ...formData, keyp: e.target.value })}
        />
      </div>
      <div className="col-12">
        <InputGroup
          id="valuep"
          name="valuep"
          text="Giá trị"
          placeholder="Nhập giá trị thuộc tính"
          value={formData.valuep}
          changed={(e) => setFormData({ ...formData, valuep: e.target.value })}
        />
      </div>
      <div className="col-12">
        <div style={{ marginTop: 28 }} className="btnForm">
          <Button
            variant="primary"
            onClick={() =>
              add(
                {
                  ...formData,
                  keyp: formData.keyp.trim(),
                  valuep: formData.valuep.trim(),
                },
                setFormData
              )
            }
          >
            Thêm
          </Button>
        </div>
      </div>
    </form>
  );
};
export default FormTT;
