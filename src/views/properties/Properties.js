import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ALL_PROPERTIES } from "../../store/action/index";
import okteamAPI from "../../utils/api/okteamAPI";
import { isOK, Fail, Success, Approve } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import FormTT from "./form/FormTT";
import TableTT from "./table/TableTT";

const Properties = ({ data, getAllProperty }) => {
  const [options, setOptions] = useState(select_sp);
  const [maSP, setMaSP] = useState("");

  // THUỘC TÍNH THEO SP
  async function onchangeSP(select) {
    const idpro = select ? select.value : "";
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/properties/list${idpro && `?idpro=${idpro}`}`
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
    setMaSP(idpro);
    getAllProperty(result);
    document.querySelector(".content").style.height = "auto";
    return true;
  }

  // SELECT SP
  async function select_sp() {
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
    const newResults = result.map((sp) => ({
      value: sp.idpro,
      label: sp.name,
    }));
    setOptions([{ value: "", label: "Tất cả" }, ...newResults]);
    onchangeSP();
    return true;
  }

  // THÊM THUỘC TÍNH
  async function them_tt(formData, setFormData) {
    if (!maSP) {
      Fail("Chưa chọn sản phẩm!");
      return false;
    }
    if (!formData.keyp) {
      Fail("Chưa nhập tên thuộc tính!");
      return false;
    }
    if (!formData.valuep) {
      Fail("Chưa nhập giá trị thuộc tính!");
      return false;
    }
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/properties/addTo/${maSP}`,
      "POST",
      formData
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
    Success("Thêm thuộc tính thành công!");
    setFormData({ id: null, keyp: "", valuep: "" });
    getAllProperty(result);
    return true;
  }
  // XÓA THUỘC TÍNH
  async function delete_tt(pro) {
    if (!pro) return;
    Approve(
      "Bạn đang thực hiện xóa thuộc tính này.\nTiếp tục thực hiện ?",
      async () => {
        fetchingOn();
        const [error, resp] = await okteamAPI(
          `/properties/delete/${pro.id}/${!maSP ? true : false}`,
          "DELETE"
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
        Success("Xóa thuộc tính thành công!");
        getAllProperty(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Thuộc tính sản phẩm";
    document.querySelector(".content").style.height = "100vh";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Thuộc tính sản phẩm</h1>
      <FormTT options={options} add={them_tt} changed={onchangeSP} />
      <TableTT data={data} deleted={delete_tt} />
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.list_property,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllProperty: (list) => {
      dispatch(ALL_PROPERTIES(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Properties);
