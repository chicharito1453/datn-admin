import InputGroup from "../../../utils/InputGroup";
import Button from "react-bootstrap/Button";

const Form = () => {
  return (
    <form>
      <br />
      <InputGroup id="fullname" text="Cộng tác viên" />
      <InputGroup id="customer" text="Khách hàng" />
      <InputGroup id="sdt" text="SĐT khách hàng" />
      <InputGroup id="createDate" text="Ngày đặt hàng" />
      <InputGroup id="address" text="Địa chỉ" />
      <br />
      <div className="mb-3">
        <label htmlFor="status1" className="form-label">
          <b>Trạng thái</b>
        </label>
        <br />
        <InputGroup
          nameClass="mb-3 form-check form-check-inline"
          id="status1"
          name="status"
          text="Đã thanh toán"
          value="1"
          labelClass="form-check-label"
          elementClass="form-check-input"
          type="radio"
        />
        <InputGroup
          nameClass="mb-3 form-check form-check-inline"
          id="status2"
          name="status"
          text="Chưa thanh toán"
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
  );
};
export default Form;
