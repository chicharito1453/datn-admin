import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import FormNhan from "./form/FormNhan";
import TableNhan from "./table/TableNhan";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, Success, Approve, isOK } from "../../utils/sweetalert2/alert";
import { ALL_BRANDS } from "../../store/action/index";

const Brand = ({ data, getAllBrands }) => {
  const [options, setOptions] = useState(select_loai);
  const [maLoai, setMaLoai] = useState("0");

  function setHeight() {
    const browserHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;
    document.querySelector(".content").style.height =
      contentHeight >= browserHeight ? "auto" : browserHeight + 60;
  }

  // NHÃN HÀNG THEO LOẠI
  const onchangeLoai = useCallback(
    async (idcate = "0") => {
      const [error, resp] = await okteamAPI(`/brand/list?idcate=${idcate}`);
      if (error) {
        Fail("Không thực hiện được thao tác!");
        console.log(error);
        return false;
      }
      const { result, message } = resp.data;
      if (!isOK(message)) {
        Fail(message);
        return false;
      }
      setMaLoai(idcate);
      getAllBrands(result);
      setHeight();
      return true;
    },
    [getAllBrands]
  );

  // DANH SÁCH LOẠI
  async function select_loai() {
    const [error, resp] = await okteamAPI("/category/list");
    if (error) {
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      Fail(message);
      return false;
    }
    const newResult = result.map((rs) => ({
      id: rs.idcate,
      name: rs.typename,
    }));
    setOptions(newResult);
    return true;
  }

  // THÊM NHÃN HÀNG
  async function them_nhan(formData, setFormData) {
    // check
    if (maLoai === "0") {
      Fail("Chưa chọn mã loại");
      return false;
    }
    if (!formData.name.trim()) {
      Fail("Chưa nhập tên nhãn hàng!");
      return false;
    }
    // them
    const [error, resp] = await okteamAPI(
      `/brand/addTo/${maLoai}`,
      "POST",
      formData
    );
    if (error) {
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      Fail(message);
      return false;
    }
    Success("Thêm nhãn hàng thành công!");
    setFormData({ id: null, name: "" });
    getAllBrands(result);
    return true;
  }

  // XÓA NHÃN HÀNG
  async function delete_nhan(brand) {
    if (brand === undefined) return;
    Approve(
      "Bạn đang thực hiện xóa Loại hàng này.\nTiếp tục thực hiện ?",
      async () => {
        const [error, resp] = await okteamAPI(
          `/brand/delete/${brand.id}/${maLoai}`,
          "DELETE"
        );
        if (error) {
          Fail("Không thực hiện được thao tác!");
          console.log(error);
          return false;
        }
        const { result, message } = resp.data;
        if (!isOK(message)) {
          Fail(message);
          return false;
        }
        Success("Xóa nhãn hàng thành công!");
        getAllBrands(result);
        return true;
      }
    );
  }

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Nhãn hàng";
    onchangeLoai();
  }, [onchangeLoai]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhãn hàng</h1>
      <FormNhan changed={onchangeLoai} add={them_nhan} options={options} />
      <TableNhan data={data} deleted={delete_nhan} />
    </div>
  );
};

const mapStatetoProp = (state) => {
  return {
    data: state.brands,
  };
};

const mapDispatchToProps = (dispath, props) => {
  return {
    getAllBrands: (list) => {
      dispath(ALL_BRANDS(list));
    },
  };
};

export default connect(mapStatetoProp, mapDispatchToProps)(Brand);
