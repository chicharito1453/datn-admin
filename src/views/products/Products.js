import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_PRODUCTS } from "../../store/action/index";
import { Fail, isOK, Success, Approve } from "../../utils/sweetalert2/alert";
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

  // CHECK FORM
  function check_form(formData) {
    // idpro
    if (!formData.idpro) {
      Fail("Chưa nhập mã sản phẩm!");
      return false;
    }
    if (!formData.name) {
      Fail("Chưa nhập tên sản phẩm!");
      return false;
    }
    if (!formData.pricectv) {
      Fail("Giá sản phẩm không hợp lệ!");
      return false;
    }
    if (!formData.qty) {
      Fail("Số lượng sản phẩm không hợp lệ!");
      return false;
    }
    if (!formData.origin) {
      Fail("Chưa nhập nơi sản xuất sản phẩm!");
      return false;
    }
    if (!formData.dvt) {
      Fail("Chưa nhập đơn vị tính sản phẩm!");
      return false;
    }
    if (!formData.tags) {
      Fail("Chưa nhập tags sản phẩm!");
      return false;
    }
    if (!formData.idcate) {
      Fail("Chưa chọn loại hàng cho sản phẩm!");
      return false;
    }
    if (!formData.idbrand) {
      Fail("Chưa chọn nhãn hiệu cho sản phẩm!");
      return false;
    }
    if (!formData.username) {
      Fail("Chưa chọn nhà cung cấp cho sản phẩm!");
      return false;
    }
    return true;
  }

  // THÊM SẢN PHẨM
  async function them_sp(formData) {
    if (!check_form(formData)) return false;
    formData = {
      ...formData,
      pricectv: Number(formData.pricectv),
      qty: Number(formData.qty),
    };
    fetchingOn();
    const [error, resp] = await okteamAPI("/products/add", "POST", formData);
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
    Success("Thêm sản phẩm thành công!");
    setShow(false);
    getAllProducts(result);
    return true;
  }

  // XÓA SẢN PHẨM
  async function delete_sp(product) {
    Approve(
      "Bạn đang thực hiện xóa sản phẩm này.\nTiếp tục thực hiện ?",
      async () => {
        fetchingOn();
        const [error, resp] = await okteamAPI(
          "/products/delete",
          "DELETE",
          product
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
        Success("Xóa sản phẩm thành công!");
        getAllProducts(result);
        return true;
      }
    );
  }

  // CẬP NHẬT SẢN PHẨM
  async function update_sp(product) {
    console.log("Cập nhật", product);
  }

  useEffect(() => {
    document.title = "Quản trị - Sản phẩm";
    document.querySelector(".content").style.height = "100vh";
    list_products();
  }, [list_products]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Sản phẩm</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(true)}
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
        <FormSP close={handleClose} add={them_sp} />
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
