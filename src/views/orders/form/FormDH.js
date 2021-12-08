import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import okteamAPI from "../../../utils/api/okteamAPI";
import callAPI from "../../../utils/api/callAPI";
import { Fail, isOK } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";
import InputGroup from "../../../components/InputGroup";

const FormDH = ({ close, saveAll, initValue, isUpdate }) => {
  const [ctvs, setCtvs] = useState(null);
  const [products, setProducts] = useState(null);
  const [huyens, setHuyens] = useState(null);
  const [cities, setCities] = useState(null);
  const [xas, setXas] = useState(null);
  const [ncc, setNcc] = useState("");
  const [pro, setPro] = useState({ value: "", label: "Tất cả" });
  const [formData, setFormData] = useState(initValue);

  // set các trường là chuỗi
  function handleChangeOrder(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // set select
  function handleSelect(e, thaotac) {
    if (thaotac === "0") {
      setFormData({
        ...formData,
        ctv: { username: e.value, fullname: e.label },
        ncc: { username: "", nccname: "Chưa chọn sản phẩm" },
        details: [],
        total: 0,
        payment: 0,
      });
      setPro({ value: "", label: "Tất cả" });
      onChangeCtv();
    }
    if (thaotac === "1") {
      setPro(e);
      setFormData({
        ...formData,
        ncc: {
          username: !e.ncc ? "" : e.ncc.username,
          nccname: !e.ncc ? "Chưa chọn sản phẩm" : e.ncc.username,
        },
      });
    }
    if (thaotac === "2") {
      setFormData({
        ...formData,
        huyen: {
          value: e.value,
          label: e.label,
        },
        xa: { value: "", label: "--Chọn xã--" },
      });
      onChangeHuyen();
    }
    if (thaotac === "3") {
      setFormData({ ...formData, xa: { value: e.value, label: e.label } });
    }
    if (thaotac === "4") {
      setFormData({
        ...formData,
        tinh: {
          value: e.value,
          label: e.label,
        },
        huyen: { value: "", label: "--Chọn huyện--" },
        xa: { value: "", label: "--Chọn xã--" },
      });
      setXas([{ value: "", label: "--Chọn xã--" }]);
      onChangeTinh();
    }
  }

  // thêm sp
  function handleAdd() {
    if (!formData.ctv.username) {
      Fail("Chọn cộng tác viên để thêm!");
      return;
    }
    if (!pro.value) {
      Fail("Chọn sản phẩm cần thêm!");
      return;
    }
    if (ncc && ncc !== formData.ncc.username) {
      Fail("Sản phẩm này thuộc nhà cung cấp khác!");
      return;
    }
    const index = formData.details.findIndex((x) => x.sp === pro.value);
    if (index < 0) {
      setFormData({
        ...formData,
        total: formData.total + pro.pricectv,
        payment: formData.payment + pro.payment,
        details: [
          ...formData.details,
          {
            sl: 1,
            sp: pro.value,
            price_customer: pro.payment,
            name: pro.label,
            image0: pro.image0,
            pricesp: pro.pricectv,
          },
        ],
      });
    } else {
      formData.details[index] = {
        ...formData.details[index],
        sl: formData.details[index].sl + 1,
      };
      setFormData({
        ...formData,
        total: formData.total + pro.pricectv,
        payment: formData.payment + pro.payment,
      });
    }
    setNcc(formData.ncc.username);
  }

  // xóa sp
  function handleRemove(index) {
    const gia = formData.details[index].pricesp;
    const giacustommer = formData.details[index].price_customer;
    if (formData.details[index].sl > 1) {
      formData.details[index] = {
        ...formData.details[index],
        sl: formData.details[index].sl - 1,
      };
      setFormData({
        ...formData,
        total: formData.total - gia,
        payment: formData.payment - giacustommer,
      });
    } else {
      formData.details.splice(index, 1);
      if (formData.details.length === 0) setNcc("");
      setFormData({
        ...formData,
        total: formData.total - gia,
        payment: formData.payment - giacustommer,
        ncc:
          formData.details.length === 0
            ? { username: "", nccname: "Chưa chọn sản phẩm" }
            : ncc,
      });
    }
  }

  // rút gọn formData để thao tác
  function compactFormData() {
    var details = formData.details.map((de) => ({
      sl: de.sl,
      sp: de.sp,
      price_customer: de.price_customer,
    }));
    return {
      ...formData,
      tinh: formData.tinh.value + "-" + formData.tinh.label,
      huyen: formData.huyen.value + "-" + formData.huyen.label,
      xa: formData.xa.value + "-" + formData.xa.label,
      customer: formData.customer.trim(),
      sdtcustomer: formData.sdtcustomer.trim(),
      order_code: formData.order_code.trim(),
      ctv: formData.ctv.username,
      ncc: formData.ncc.username,
      status: +formData.status,
      details,
    };
  }

  // select sp
  const onChangeCtv = useCallback(async () => {
    const username = formData.ctv.username;
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/regi_products/list${username && `?username=${username}`}`
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
        value: rs.products.idpro,
        label: rs.products.name,
        pricectv: rs.products.pricectv,
        image0: rs.products.image0,
        ncc: {
          nccname: rs.products.ncc.nccname,
          username: rs.products.ncc.username,
        },
        payment: rs.price,
      })),
    ]);
    return true;
  }, [formData.ctv.username]);

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
      ...result.map((rs) => ({ value: rs.username, label: rs.username })),
    ]);
    onChangeCtv();
    return true;
  }, [onChangeCtv]);

  // select xa
  const onChangeHuyen = useCallback(async () => {
    const district_id = formData.huyen.value;
    if (!district_id) {
      setXas([{ value: "", label: "--Chọn xã--" }]);
      return;
    }
    fetchingOn();
    const [error, resp] = await callAPI(
      process.env.REACT_APP_URL_XA + district_id
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { data } = resp.data;
    fetchingOff();
    if (!data) {
      setXas([{ value: "", label: "--Chọn xã--" }]);
      return;
    }
    setXas([
      { value: "", label: "--Chọn xã--" },
      ...data.map((x) => ({ value: x.WardCode, label: x.WardName })),
    ]);
    return true;
  }, [formData.huyen.value]);

  // select huyen
  const onChangeTinh = useCallback(async () => {
    const province_id = formData.tinh.value;
    if (!province_id) {
      setHuyens([{ value: "", label: "--Chọn huyện--" }]);
      setXas([{ value: "", label: "--Chọn xã--" }]);
      return;
    }
    fetchingOn();
    const [error, resp] = await callAPI(
      process.env.REACT_APP_URL_HUYEN + province_id
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    fetchingOff();
    const { data } = resp.data;
    setHuyens([
      { value: "", label: "--Chọn huyện--" },
      ...data.map((h) => ({ value: h.DistrictID, label: h.DistrictName })),
    ]);
    onChangeHuyen();
    return true;
  }, [onChangeHuyen, formData.tinh.value]);

  // select tỉnh
  const select_tinh = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await callAPI(process.env.REACT_APP_URL_TINH);
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    fetchingOff();
    setCities([
      { value: "", label: "--Chọn tỉnh/TP--" },
      ...resp.data.data.map((rs) => ({
        value: rs.ProvinceID,
        label: rs.ProvinceName,
      })),
    ]);
    onChangeTinh();
  }, [onChangeTinh]);

  useEffect(() => {
    select_ctv();
    select_tinh();
  }, [select_ctv, select_tinh]);

  return (
    <>
      <Modal.Body>
        <form>
          {!isUpdate && (
            <>
              <br />
              <InputGroup
                id="customer"
                name="customer"
                text="Khách hàng"
                value={formData.customer}
                changed={handleChangeOrder}
              />
              <InputGroup
                id="sdtcustomer"
                name="sdtcustomer"
                text="SĐT khách hàng"
                value={formData.sdtcustomer}
                changed={handleChangeOrder}
              />
            </>
          )}
          <InputGroup
            id="city"
            type="select"
            name="city"
            text="Tỉnh/TP"
            options={cities}
            value={formData.tinh}
            changed={(e) => handleSelect(e, "4")}
          />
          <InputGroup
            id="huyen"
            type="select"
            name="huyen"
            text="Huyện"
            options={huyens}
            value={formData.huyen}
            changed={(e) => handleSelect(e, "2")}
          />
          <InputGroup
            id="xa"
            type="select"
            name="xa"
            text="Xã"
            options={xas}
            value={formData.xa}
            changed={(e) => handleSelect(e, "3")}
          />
          {!isUpdate && (
            <>
              <InputGroup
                id="address"
                name="address"
                text="Địa chỉ"
                value={formData.address}
                changed={handleChangeOrder}
              />
              <InputGroup
                id="order_code"
                name="order_code"
                text="Mã đơn vận"
                value={formData.order_code}
                changed={handleChangeOrder}
              />
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
            </>
          )}
          <br />

          <div className="row">
            <div className="col">
              <InputGroup
                id="ctv"
                type="select"
                name="ctv"
                text="Cộng tác viên"
                options={ctvs}
                value={{
                  value: formData.ctv.username,
                  label: formData.ctv.fullname,
                }}
                changed={(e) => handleSelect(e, "0")}
              />
            </div>
            <div className="col">
              <InputGroup
                id="details"
                type="select"
                name="details"
                text="Sản phẩm"
                options={products}
                value={{ value: pro.value, label: pro.label }}
                changed={(e) => handleSelect(e, "1")}
              />
            </div>
            <div className="col">
              <label>Nhà cung cấp</label>
              <p style={{ marginTop: 14 }}>{formData.ncc.nccname}</p>
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
                    <th>Giá gốc</th>
                    <th>Giá đăng ký</th>
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
                          <td>{dt.pricesp}</td>
                          <td>{dt.price_customer}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td align="center" colSpan="6">
                        <b style={{ color: "red" }}>Chưa chọn sản phẩm nào</b>
                      </td>
                    </tr>
                  )}
                  {formData.total > 0 && (
                    <tr>
                      <td>
                        <b>Tổng</b>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <b style={{ color: "red" }}>{formData.total}</b>
                      </td>
                      <td>
                        <b style={{ color: "red" }}>{formData.payment}</b>
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
          {!isUpdate ? (
            <Button
              variant="primary"
              onClick={() =>
                saveAll(compactFormData(formData), "/order/add", "POST")
              }
            >
              Lưu
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() =>
                saveAll(
                  compactFormData(formData),
                  "/order/update-chitiet",
                  "PUT"
                )
              }
            >
              Sửa
            </Button>
          )}
          <Button variant="primary" onClick={close}>
            Đóng
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};
export default FormDH;
