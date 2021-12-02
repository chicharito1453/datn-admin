import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import okteamAPI from "../../../utils/api/okteamAPI";
import { Fail, isOK } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";
import InputGroup from "../../../components/InputGroup";

const FormDH = ({ close, initValue }) => {
  const [nccs, setNccs] = useState(null);
  const [ctvs, setCtvs] = useState(null);
  const [products, setProducts] = useState(null);
  const [pro, setPro] = useState({ value: "", label: "Tất cả" });
  const [formData, setFormData] = useState(initValue);

  function handleChangeOrder(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSelect(e, thaotac) {
    if (thaotac === "0") {
      setFormData({
        ...formData,
        ctv: { username: e.value, fullname: e.label },
      });
    }
    if (thaotac === "1") {
      setFormData({
        ...formData,
        ncc: { username: e.value, nccname: e.label },
        details: [],
      });
      setPro({ value: "", label: "Tất cả" });
      onChangeNcc(e);
    }
    if (thaotac === "2") {
      setPro(e);
    }
  }

  function handleAdd() {
    if (!pro.value) {
      Fail("Chưa chọn sản phẩm cần thêm!");
      return;
    }
    const index = formData.details.findIndex((x) => x.sp === pro.value);
    if (index < 0) {
      setFormData({
        ...formData,
        total: formData.total + pro.pricectv,
        details: [
          ...formData.details,
          {
            sl: 1,
            sp: pro.value,
            price_customer: pro.pricectv,
            name: pro.label,
            image0: pro.image0,
          },
        ],
      });
    } else {
      formData.details[index] = {
        ...formData.details[index],
        sl: formData.details[index].sl + 1,
      };
      setFormData({ ...formData, total: formData.total + pro.pricectv });
    }
  }

  function handleRemove(index) {
    if (formData.details[index].sl > 1) {
      formData.details[index] = {
        ...formData.details[index],
        sl: formData.details[index].sl - 1,
      };
      setFormData({ ...formData, total: formData.total - pro.pricectv });
    } else {
      formData.details.splice(index, 1);
      setFormData({ ...formData, total: formData.total - pro.pricectv });
    }
  }

  // select ctv
  const select_ctv = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/ctv/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    setCtvs([
      { value: "", label: "Tất cả" },
      ...result.map((rs) => ({ value: rs.username, label: rs.fullname })),
    ]);
    return true;
  }, []);

  // select ncc
  const select_ncc = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/ncc/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    setNccs([
      { value: "", label: "Tất cả" },
      ...result.map((rs) => ({ value: rs.username, label: rs.nccname })),
    ]);
    onChangeNcc();
    return true;
  }, []);

  // select sp
  async function onChangeNcc(select) {
    const username = select ? select.value : "";
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/products/list${username && `?username=${username}`}`
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    setProducts([
      { value: "", label: "Tất cả" },
      ...result.map((rs) => ({
        value: rs.idpro,
        label: rs.name,
        pricectv: rs.pricectv,
        image0: rs.image0,
      })),
    ]);
    return true;
  }

  useEffect(() => {
    select_ctv();
    select_ncc();
  }, [select_ncc, select_ctv]);

  return (
    <>
      <Modal.Body>
        <form>
          <br />
          <InputGroup
            id="customer"
            name="customer"
            text="Khách hàng"
            changed={handleChangeOrder}
          />
          <InputGroup
            id="sdtcustomer"
            name="sdtcustomer"
            text="SĐT khách hàng"
            changed={handleChangeOrder}
          />
          <InputGroup
            id="huyen"
            name="huyen"
            text="Huyện"
            changed={handleChangeOrder}
          />
          <InputGroup id="xa" name="xa" text="Xã" changed={handleChangeOrder} />
          <InputGroup
            id="address"
            name="address"
            text="Địa chỉ"
            changed={handleChangeOrder}
          />
          <InputGroup
            id="order_code"
            name="order_code"
            text="Order code"
            changed={handleChangeOrder}
          />
          <br />
          <div className="row">
            <InputGroup
              id="ctv"
              type="select"
              name="ctv"
              text="Cộng tác viên"
              placeholder="Tên nhãn"
              options={ctvs}
              value={{
                value: formData.ctv.username,
                label: formData.ctv.fullname,
              }}
              changed={(e) => handleSelect(e, "0")}
            />
            <InputGroup
              id="ncc"
              type="select"
              name="ncc"
              text="Nhà cung cấp"
              placeholder="Tên nhà cung cấp"
              options={nccs}
              value={{
                value: formData.ncc.username,
                label: formData.ncc.nccname,
              }}
              changed={(e) => handleSelect(e, "1")}
            />
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="status1" className="form-label">
              <b>Trạng thái</b>
            </label>
            <br />
            <InputGroup
              nameClass="mb-3 form-check form-check-inline"
              id="status0"
              name="status"
              text="Chờ xác nhận"
              value="0"
              labelClass="form-check-label"
              elementClass="form-check-input"
              type="radio"
              isChecked={formData.status === "0"}
              changed={handleChangeOrder}
            />
            <InputGroup
              nameClass="mb-3 form-check form-check-inline"
              id="status1"
              name="status"
              text="Giao thành công"
              value="1"
              labelClass="form-check-label"
              elementClass="form-check-input"
              type="radio"
              isChecked={formData.status === "1"}
              changed={handleChangeOrder}
            />
            <InputGroup
              nameClass="mb-3 form-check form-check-inline"
              id="status2"
              name="status"
              text="Đang giao"
              value="2"
              labelClass="form-check-label"
              elementClass="form-check-input"
              type="radio"
              isChecked={formData.status === "2"}
              changed={handleChangeOrder}
            />
            <InputGroup
              nameClass="mb-3 form-check form-check-inline"
              id="status3"
              name="status"
              text="Trả về"
              value="3"
              labelClass="form-check-label"
              elementClass="form-check-input"
              type="radio"
              isChecked={formData.status === "3"}
              changed={handleChangeOrder}
            />
            <InputGroup
              nameClass="mb-3 form-check form-check-inline"
              id="status4"
              name="status"
              text="Hủy"
              value="4"
              labelClass="form-check-label"
              elementClass="form-check-input"
              type="radio"
              isChecked={formData.status === "4"}
              changed={handleChangeOrder}
            />
            <InputGroup
              nameClass="mb-3 form-check form-check-inline"
              id="status5"
              name="status"
              text="Đã thanh toán"
              value="5"
              labelClass="form-check-label"
              elementClass="form-check-input"
              type="radio"
              isChecked={formData.status === "5"}
              changed={handleChangeOrder}
            />
          </div>
          <div className="row">
            <div className="col">
              <InputGroup
                id="details"
                type="select"
                name="details"
                text="Sản phẩm"
                placeholder="Tên sp"
                options={products}
                value={{ value: pro.value, label: pro.label }}
                changed={(e) => handleSelect(e, "2")}
              />
            </div>
            <div className="col">
              <Button
                type="button"
                style={{ marginTop: 28, fontSize: 18 }}
                variant="danger"
                onClick={handleAdd}
              >
                Thêm
              </Button>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="table-responsive">
              <table
                className="table table-striped table-borderless table-hover table-md table-responsive-sm"
                cellSpacing="0"
              >
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.details.length > 0 ? (
                    <>
                      {formData.details.map((dt, index) => (
                        <tr key={dt.sp}>
                          <td>
                            <i
                              onClick={() => handleRemove(index)}
                              style={{ cursor: "pointer" }}
                              className="far fa-trash-alt"
                            ></i>
                          </td>
                          <td>{dt.name}</td>
                          <td>
                            <img
                              src={dt.image0 || "/assets/img/default.jpg"}
                              width="70"
                              height="70"
                              alt=""
                              className="img img-thumbnail pull-left"
                            />
                          </td>
                          <td>{dt.sl}</td>
                          <td>{dt.price_customer}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td align="center" colSpan="5">
                        <b style={{ color: "red" }}>Chưa chọn sản phẩm nào</b>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="btnForm">
          <Button variant="primary" onClick={() => console.log(formData)}>
            Lưu
          </Button>
          <Button variant="primary" onClick={close}>
            Đóng
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};
export default FormDH;
