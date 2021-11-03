import FormNhan from "./form/FormNhan";
import TableNhan from "./table/TableNhan";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, Success } from "../../utils/sweetalert2/alert";
import { isOK } from "../../common/isOk";
import { useEffect, useState } from "react";

const Brand = () => {
  const [options, setOptions] = useState(select_loai);
  const [data, setData] = useState(onchangeLoai);
  const [maLoai, setMaLoai] = useState("0");

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Nhãn hàng";
  }, []);

  function setHeight() {
    const browserHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;
    document.querySelector(".content").style.height =
      contentHeight >= browserHeight ? "auto" : browserHeight + 60;
  }

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

  // NHÃN HÀNG THEO LOẠI
  async function onchangeLoai(idcate = "0") {
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
    setData(result);
    setMaLoai(idcate);
    setHeight();
    return true;
  }

  // THÊM NHÃN HÀNG
  async function them_nhan(formData) {
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
    setData(result);
    return true;
  }

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhãn hàng</h1>
      <FormNhan changed={onchangeLoai} add={them_nhan} options={options} />
      <TableNhan data={data} />
    </div>
  );
};
export default Brand;
