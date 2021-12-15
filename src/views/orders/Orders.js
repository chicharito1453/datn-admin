import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_ORDERS } from "../../store/action/index";
import { regexSDT } from "../../utils/regex/regex";
import TableDH from "./table/TableDH";
import FormDH from "./form/FormDH";
import okteamAPI from "../../utils/api/okteamAPI";
import { isOK, Fail, Success, Approve } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";

const initialState = {
  idorder: null,
  total: 0,
  payment: 0,
  status: "0",
  tinh: { value: "", label: "--Chọn tỉnh/TP--" },
  huyen: { value: "", label: "--Chọn huyện--" },
  xa: { value: "", label: "--Chọn xã--" },
  address: "",
  customer: "",
  sdtcustomer: "",
  order_code: "",
  ctv: { username: "", fullname: "Tất cả" },
  ncc: { username: "", nccname: "Chưa chọn sản phẩm" },
  details: [],
};

const Orders = ({ data, getAllOrders }) => {
  const [show, setShow] = useState(false);
  const [initValue, setInitValue] = useState(initialState);
  const [isUpdate, setIsUpdate] = useState(false);

  function handleClose() {
    setInitValue(initialState);
    setShow(false);
  }

  // DANH SÁCH ĐƠN HÀNG
  const list_orders = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/order/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      getAllOrders([]);
      document.querySelector(".content").style.height = "auto";
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    getAllOrders(result);
    document.querySelector(".content").style.height = "auto";
    return true;
  }, [getAllOrders]);

  // CHECK FORM
  function check_form(formData) {
    if (!formData.customer) {
      Fail("Chưa nhập khách hàng!");
      return false;
    }
    if (!regexSDT.test(formData.sdtcustomer)) {
      Fail("Số điện thoại khách hàng không hợp lệ!");
      return false;
    }
    if (formData.tinh === "---Chọn tỉnh/TP--") {
      Fail("Chưa chọn tỉnh!");
      return false;
    }
    if (formData.huyen === "---Chọn huyện--") {
      Fail("Chưa chọn huyện!");
      return false;
    }
    if (formData.xa === "---Chọn xã--") {
      Fail("Chưa chọn xã!");
      return false;
    }
    if (!formData.address) {
      Fail("Chưa nhập địa chỉ giao hàng!");
      return false;
    }
    if (!formData.ctv) {
      Fail("Chưa chọn cộng tác viên!");
      return false;
    }
    if (formData.total === 0) {
      Fail("Không thể tạo hóa đơn rỗng!");
      return false;
    }
    return true;
  }

  // TẠO ĐON HÀNG
  async function saveAll(formData, endpoint, method) {
    if (!check_form(formData)) return;
    // gan tinh, huyenm xa vao dia chi
    formData.address =
      method === "PUT"
        ? formData.address.trim()
        : `${formData.address.trim()}- ${formData.xa.label}- ${
            formData.huyen.label
          }-${formData.tinh.label}`;
    fetchingOn();
    const [error, resp] = await okteamAPI(endpoint, method, formData);
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
    Success(
      method === "POST"
        ? "Tạo đơn hàng thành công!"
        : "Cập nhật thông tin thành công!"
    );
    setShow(false);
    setInitValue(initialState);
    setIsUpdate(false);
    getAllOrders(result);
    return true;
  }

  // HỦY ĐƠN HÀNG
  async function detele_order(order) {
    Approve(
      "Bạn đang thực hiện hủy đơn hàng này.\nTiếp tục thực hiện ?",
      async () => {
        order = { ...order, ncc: order.ncc.username, ctv: order.ctv.username };
        fetchingOn();
        const [error, resp] = await okteamAPI("/order/delete", "DELETE", order);
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
        Success("Hủy đơn thành công");
        getAllOrders(result);
        return true;
      }
    );
  }

  // SET DATA LÊN FORM
  async function mapRowtoForm(order) {
    if (!order) return;
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/order/getone?idorder=${order.idorder}`
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, object, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    const tinh = object.tinh.split("-");
    const huyen = object.huyen.split("-");
    const xa = object.xa.split("-");
    setIsUpdate(true);
    var details = object.details.map((de) => ({
      sp: de.products.idpro,
      sl: de.qty,
      price_customer: de.revenue,
      name: de.products.name,
      image0: de.products.image0,
      pricesp: de.products.pricectv,
    }));
    setInitValue({
      ...object,
      details,
      tinh: { value: tinh[0], label: tinh[1] },
      huyen: { value: huyen[0], label: huyen[1] },
      xa: { value: xa[0], label: xa[1] },
      status: object.status.toString(),
      order_code: object.order_code || "",
    });
    getAllOrders(result);
    setShow(true);
  }

  useEffect(() => {
    document.title = "Quản trị - Đơn hàng";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    list_orders();
  }, [list_orders]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Đơn hàng</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => {
          setIsUpdate(false);
          setShow(true);
        }}
      >
        Tạo đơn hàng
      </Button>
      <br />
      <br />
      <TableDH data={data} deleted={detele_order} getRow={mapRowtoForm} />
      <Modal
        size="lg"
        show={show}
        centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{!isUpdate ? "Tạo" : "Cập nhật"} đơn hàng</Modal.Title>
        </Modal.Header>
        <FormDH
          close={handleClose}
          saveAll={saveAll}
          initValue={initValue}
          isUpdate={isUpdate}
        />
      </Modal>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.list_orders,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllOrders: (list) => {
      dispatch(ALL_ORDERS(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Orders);
