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
import okteam_upload from "../../utils/api/okteam_upload";
import FormSP from "./form/FormSP";
import TableSP from "./table/TableSP";

const initialState = {
  idpro: "",
  name: "",
  pricectv: "0",
  qty: "0",
  origin: "",
  dvt: "",
  tags: "",
  idcate: { idcate: "", typename: "Tất cả" },
  idbrand: { id: "", name: "Tất cả" },
  username: { username: "", nccname: "Tất cả" },
  active: false,
  image0: null,
  image1: null,
  image2: null,
  image3: null,
  description: "",
};

const Products = ({ data, getAllProducts }) => {
  const [show, setShow] = useState(false);
  const [initValue, setInitValue] = useState(initialState);
  const [isUpdate, setIsUpdate] = useState(false);

  function handleClose() {
    setInitValue(initialState);
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
      getAllProducts([]);
      document.querySelector(".content").style.height = "auto";
      return false;
    }
    const { result } = resp.data;
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
    // name
    if (!formData.name) {
      Fail("Chưa nhập tên sản phẩm!");
      return false;
    }
    // pricectv
    if (!formData.pricectv || +formData.pricectv < 0) {
      Fail("Giá sản phẩm không hợp lệ!");
      return false;
    }
    //qty
    if (!formData.qty) {
      Fail("Số lượng sản phẩm không hợp lệ!");
      return false;
    }
    // origin
    if (!formData.origin) {
      Fail("Chưa nhập nơi sản xuất sản phẩm!");
      return false;
    }
    // dvt
    if (!formData.dvt) {
      Fail("Chưa nhập đơn vị tính sản phẩm!");
      return false;
    }
    //tags
    if (!formData.tags) {
      Fail("Chưa nhập tags sản phẩm!");
      return false;
    }
    // category
    if (!formData.idcate) {
      Fail("Chưa chọn loại hàng cho sản phẩm!");
      return false;
    }
    // brand
    if (!formData.idbrand) {
      Fail("Chưa chọn nhãn hiệu cho sản phẩm!");
      return false;
    }
    // ncc
    if (!formData.username) {
      Fail("Chưa chọn nhà cung cấp cho sản phẩm!");
      return false;
    }
    return true;
  }

  // THÊM VÀ CẬP NHẬT SẢN PHẨM
  async function saveAll(formData, endpoint, method) {
    if (!check_form(formData)) return false;
    // check idpro khi co anh can upload
    if (
      formData.image0 ||
      formData.image1 ||
      formData.image2 ||
      formData.image3
    ) {
      const [error, resp] = await okteamAPI(
        `/products/check-id/${formData.idpro}`
      );
      if (error) {
        Fail("Không thực hiện được thao tác!");
        console.log(error);
        return false;
      }
      if (method === "POST" && resp.data) {
        Fail("Mã sản phẩm đã tồn tại, vui lòng chọn mã khác!");
        return false;
      }
      if (method === "PUT" && !resp.data) {
        Fail("Không tìm thấy sản phẩm!");
        return false;
      }
    }

    formData = {
      ...formData,
      pricectv: +formData.pricectv,
      qty: +formData.qty,
    };
    fetchingOn();
    // upload image 0
    if (formData.image0 && typeof formData.image0 !== "string") {
      const [error, resp] = await okteam_upload(formData.image0);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.image0 = resp.data.secure_url;
    }
    // upload image 1
    if (formData.image1 && typeof formData.image1 !== "string") {
      const [error, resp] = await okteam_upload(formData.image1);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.image1 = resp.data.secure_url;
    }
    // upload image 2
    if (formData.image2 && typeof formData.image2 !== "string") {
      const [error, resp] = await okteam_upload(formData.image2);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.image2 = resp.data.secure_url;
    }
    // upload image 3
    if (formData.image3 && typeof formData.image3 !== "string") {
      const [error, resp] = await okteam_upload(formData.image3);
      if (error) {
        fetchingOff();
        Fail("Không upload được ảnh!");
        console.log(error);
        return false;
      }
      formData.image3 = resp.data.secure_url;
    }

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
        ? "Thêm sản phẩm thành công!"
        : "Cập nhật thông tin thành công!"
    );
    setShow(false);
    setInitValue(initialState);
    setIsUpdate(false);
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

  // SET DATA LÊN FORM
  async function mapRowtoForm(product) {
    if (!product) return;
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/products/getone?idpro=${product.idpro}`
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
    setIsUpdate(true);
    setInitValue({
      ...object,
      pricectv: object.pricectv + "",
      qty: object.qty + "",
      idcate: {
        idcate: object.category.idcate,
        typename: object.category.typename,
      },
      idbrand: { id: object.p_brand.id, name: object.p_brand.name },
      username: {
        username: object.ncc.username,
        nccname: object.ncc.nccname,
      },
      image0: object.image0 || null,
      image1: object.image1 || null,
      image2: object.image2 || null,
      image3: object.image3 || null,
    });
    getAllProducts(result);
    setShow(true);
  }

  useEffect(() => {
    document.title = "Quản trị - Sản phẩm";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    list_products();
  }, [list_products]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Sản phẩm</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => {
          setIsUpdate(false);
          setShow(true);
        }}
      >
        Thêm sản phẩm
      </Button>
      <br />
      <br />
      <TableSP data={data} deleted={delete_sp} getRow={mapRowtoForm} />
      <Modal
        size="lg"
        show={show}
        centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{!isUpdate ? "Thêm" : "Sửa"} sản phẩm</Modal.Title>
        </Modal.Header>
        <FormSP
          close={handleClose}
          initValue={initValue}
          saveAll={saveAll}
          isUpdate={isUpdate}
        />
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
