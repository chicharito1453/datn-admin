import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_PRODUCTS } from "../../store/action/index";
import { Fail, isOK } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import okteamAPI from "../../utils/api/okteamAPI";
import FormSP from "./form/FormSP";
import TableSP from "./table/TableSP";

const Products = ({ data, getAllProducts }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  // DANH SÁCH SẢN PHẨM
  const list_products = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/products/list");
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
    getAllProducts(result);
    document.querySelector(".content").style.height = "auto";
    return true;
  }, [getAllProducts]);

  // THÊM SẢN PHẨM
  async function them_sp(formData) {}

  // XÓA SẢN PHẨM
  async function delete_sp(row) {
    console.log("Xóa", row);
  }

  // CẬP NHẬT SẢN PHẨM
  async function update_sp(row) {
    console.log("Cập nhật", row);
  }

  useEffect(() => {
    document.title = "Quản trị - Sản phẩm";
    list_products();
  }, [list_products]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Sản phẩm</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Thêm sản phẩm
      </Button>
      <br />
      <br />
      <TableSP data={data} deleted={delete_sp} update={update_sp} />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhà cung cấp</Modal.Title>
        </Modal.Header>
        <FormSP close={handleClose} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.list_product,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllProducts: (list) => {
      dispatch(ALL_PRODUCTS(list));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
