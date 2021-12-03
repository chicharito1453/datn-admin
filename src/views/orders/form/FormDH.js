import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import okteamAPI from "../../../utils/api/okteamAPI";
import { Fail, isOK } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";
import InputGroup from "../../../components/InputGroup";

const FormDH = ({ close, saveAll, initValue, isUpdate }) => {
  const [ctvs, setCtvs] = useState(null);
  const [products, setProducts] = useState(null);
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
      onChangeCtv(e);
    }
    if (thaotac === "1") {
      setPro(e);
      setFormData({
        ...formData,
        ncc: {
          username: !e.ncc ? "" : e.ncc.username,
          nccname: !e.ncc ? "Chưa chọn sản phẩm" : e.ncc.nccname,
        },
      });
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
      huyen: formData.huyen.trim(),
      xa: formData.xa.trim(),
      address: formData.address.trim(),
      customer: formData.customer.trim(),
      sdtcustomer: formData.sdtcustomer.trim(),
      order_code: formData.order_code.trim(),
      ctv: formData.ctv.username,
      ncc: formData.ncc.username,
      status: Number(formData.status),
      details,
    };
  }

  // select sp
  const onChangeCtv = useCallback(
    async (select) => {
      var username = formData.ctv.username;
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
    },
    [formData.ctv.username]
  );

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
    onChangeCtv();
    return true;
  }, [onChangeCtv]);

  useEffect(() => {
    select_ctv();
  }, [select_ctv]);

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
              <InputGroup
                id="huyen"
                name="huyen"
                text="Huyện"
                value={formData.huyen}
                changed={handleChangeOrder}
              />
              <InputGroup
                id="xa"
                name="xa"
                text="Xã"
                value={formData.xa}
                changed={handleChangeOrder}
              />
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
                placeholder="Tên nhãn"
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
                placeholder="Tên sp"
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
