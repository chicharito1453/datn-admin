import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_ORDERS } from "../../store/action/index";
import { regexSDT } from "../../utils/regex/regex";
import TableDH from "./table/TableDH";
import FormDH from "./form/FormDH";
import okteamAPI from "../../utils/api/okteamAPI";
import { isOK, Fail } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";

const initialState = {
  idorder: null,
  total: 0,
  payment: 0,
  status: "0",
  huyen: "",
  xa: "",
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

  function handleClose() {
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
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    getAllOrders(result);
    document.querySelector(".content").style.height = "auto";
    return true;
  }, [getAllOrders]);

  // CHECK FORM
  function check_form(formData) {
    console.log(formData);
    if (!formData.customer) {
      Fail("Chưa nhập khách hàng!");
      return false;
    }
    if (!regexSDT.test(formData.sdtcustomer)) {
      Fail("Số điện thoại khách hàng không hợp lệ!");
      return false;
    }
    if (!formData.huyen) {
      Fail("Chưa nhập thông tin huyện!");
      return false;
    }
    if (!formData.xa) {
      Fail("Chưa nhập thông tin xã!");
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
  async function saveAll(formData) {
    if (!check_form(formData)) return;
    console.log("ok");
  }

  useEffect(() => {
    document.title = "Quản trị - Đơn hàng";
    document.querySelector(".content").style.height = "100vh";
    list_orders();
  }, [list_orders]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Đơn hàng</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Tạo đơn hàng
      </Button>
      <br />
      <br />
      <TableDH data={data} />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo đơn hàng</Modal.Title>
        </Modal.Header>
        <FormDH close={handleClose} saveAll={saveAll} initValue={initValue} />
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
