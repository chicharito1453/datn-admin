import InputGroup from "../../common/InputGroup";
import Button from "react-bootstrap/Button";

const Form = ({ xemChiTiet }) => {
  return (
    <form style={{ width: "70%", textAlign: "left" }}>
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
        <Button variant="primary">Thêm</Button>
        <Button variant="primary" onClick={xemChiTiet}>
          Chi tiết
        </Button>
      </div>
    </form>
  );
};
export default Form;
