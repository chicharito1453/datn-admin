import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import FormNhan from "./form/FormNhan";
import TableNhan from "./table/TableNhan";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, Success, Approve, isOK } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import { ALL_BRANDS } from "../../store/action/index";

const Brand = ({ data, getAllBrands }) => {
  const [options, setOptions] = useState(null);
  const [maLoai, setMaLoai] = useState("");

  // NHÃN HÀNG THEO LOẠI
  const onchangeLoai = useCallback(
    async (select) => {
      const idcate = select ? select.value : "";
      fetchingOn();
      const [error, resp] = await okteamAPI(
        `/brand/list${idcate && `?idcate=${idcate}`}`
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
        getAllBrands([]);
        document.querySelector(".content").style.height = "auto";
        return false;
      }
      fetchingOff();
      setMaLoai(idcate);
      getAllBrands(result);
      document.querySelector(".content").style.height = "auto";
      return true;
    },
    [getAllBrands]
  );

  // DANH SÁCH LOẠI
  const select_loai = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/category/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      getAllBrands([]);
      document.querySelector(".content").style.height = "auto";
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    const newResult = result.filter((rs) => rs.lv === 1);
    setOptions([
      { value: "", label: "Tất cả" },
      ...newResult.map((rs) => ({
        value: rs.idcate,
        label: rs.typename,
      })),
    ]);
    onchangeLoai();
    return true;
  }, [getAllBrands, onchangeLoai]);

  // THÊM NHÃN HÀNG
  async function them_nhan(formData, setFormData) {
    // check
    if (!maLoai) {
      Fail("Chưa chọn loại hàng!");
      return false;
    }
    if (!formData.name.trim()) {
      Fail("Chưa nhập tên nhãn hàng!");
      return false;
    }
    // them
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/brand/addTo/${maLoai}`,
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
    Success("Thêm nhãn hàng thành công!");
    setFormData({ id: null, name: "" });
    getAllBrands(result);
    return true;
  }

  // XÓA NHÃN HÀNG
  async function delete_nhan(brand) {
    if (!brand) return;
    Approve(
      "Bạn đang thực hiện xóa Loại hàng này.\nTiếp tục thực hiện ?",
      async () => {
        fetchingOn();
        const [error, resp] = await okteamAPI(
          `/brand/delete/${brand.id}/${!maLoai ? true : false}`,
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
        Success("Xóa nhãn hàng thành công!");
        getAllBrands(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Nhãn hàng";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    select_loai();
  }, [select_loai]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhãn hiệu</h1>
      <FormNhan changed={onchangeLoai} add={them_nhan} options={options} />
      <TableNhan data={data} deleted={delete_nhan} />
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.brands,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllBrands: (list) => {
      dispatch(ALL_BRANDS(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Brand);
