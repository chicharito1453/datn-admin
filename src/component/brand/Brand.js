import FormNhan from "./form/FormNhan";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, Success } from "../../utils/sweetalert2/alert";
import { isOK } from "../../common/isOk";
import { useEffect, useState } from "react";

const Brand = () => {
  const [options, setOptions] = useState(select_loai);

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Nhãn hàng";
  }, []);

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
  async function onchangeLoai(idcate) {
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
    console.log(result);
  }

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhãn hàng</h1>
      <FormNhan changed={onchangeLoai} options={options} />
    </div>
  );
};
export default Brand;
