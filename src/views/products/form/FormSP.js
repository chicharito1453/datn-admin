import { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { connect } from "react-redux";
import okteamAPI from "../../../utils/api/okteamAPI";
import { Fail, isOK } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";
import Image from "../../../components/Image";
import InputGroup from "../../../components/InputGroup";

const FormSP = ({ close }) => {
  const [Loais, setLoais] = useState(null);
  const [maLoai, setMaLoai] = useState("");
  const [Nccs, setNccs] = useState(null);
  const [Nhans, setNhans] = useState(null);

  // FILL SELECT NCC
  const select_ncc = useCallback(async () => {
    const [error, resp] = await okteamAPI("/ncc/list");
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
    setNccs([
      { value: "", label: "Tất cả" },
      ...result.map((ncc) => ({ value: ncc.username, label: ncc.nccname })),
    ]);
    return true;
  }, []);

  //FILL SELECT NHÃN
  const onchangeLoai = useCallback(async (select, isFetch) => {
    const idcate = select ? select.value : "";
    if (isFetch) fetchingOn();
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
      return false;
    }
    fetchingOff();
    setMaLoai(idcate);
    setNhans([
      { value: "", label: "Tất cả" },
      ...result.map((nhan) => ({ value: nhan.id, label: nhan.name })),
    ]);
    return true;
  }, []);

  // FILL SELECT LOẠI
  const select_category = useCallback(async () => {
    fetchingOn();
    // lay danh sach loai
    const [error, resp] = await okteamAPI("/category/list");
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
    setLoais([
      { value: "", label: "Tất cả" },
      ...result.map((cate) => ({ value: cate.idcate, label: cate.typename })),
    ]);
    onchangeLoai();
    return true;
  }, [onchangeLoai]);

  useEffect(() => {
    select_ncc();
    select_category();
    return () => {};
  }, [select_category, select_ncc]);

  return (
    <>
      <Modal.Body>
        <form id="productForm">
          <div className="col">
            <InputGroup id="name" text="Tên sản phẩm" />
            <InputGroup id="price" text="Giá" type="number" min="0" />
            <InputGroup id="soluong" text="Số lượng" type="number" min="0" />
            <InputGroup id="origin" text="Xuất xứ" />
            <InputGroup id="origin" text="Thuộc tính phụ" />
            <div className="row">
              <InputGroup
                id="loai"
                type="select"
                name="loai"
                text="Loại hàng"
                placeholder="Tên loại"
                options={Loais}
                changed={(e) => {
                  onchangeLoai(e, true);
                }}
              />
              <InputGroup
                id="nhan"
                type="select"
                name="nhan"
                text="Nhãn hàng"
                placeholder="Tên nhãn"
                options={Nhans}
              />
              <InputGroup
                id="ncc"
                type="select"
                name="ncc"
                text="Nhà cung cấp"
                placeholder="Tên nhà cung cấp"
                options={Nccs}
              />
            </div>
            <br />
            <div className="col">
              <label htmlFor="active" className="form-label">
                <b>Trạng thái</b>
              </label>
              <br />
              <InputGroup
                nameClass="form-check form-check-inline"
                id="active"
                name="active"
                text="Kích hoạt"
                value="1"
                labelClass="form-check-label"
                elementClass="form-check-input"
                type="radio"
              />
              <InputGroup
                nameClass="form-check form-check-inline"
                id="nonactive"
                name="active"
                text="Vô hiệu"
                value="0"
                labelClass="form-check-label"
                elementClass="form-check-input"
                type="radio"
              />
            </div>
            <br />
            <div className="row">
              <Image
                text="Chọn ảnh 1"
                idFile="link1"
                idButton="btnLink1"
                classButton="danger"
              />
              <Image
                text="Chọn ảnh 2"
                idFile="link2"
                idButton="btnLink2"
                classButton="danger"
              />
              <Image
                text="Chọn ảnh 3"
                idFile="link3"
                idButton="btnLink3"
                classButton="danger"
              />
              <Image
                text="Chọn ảnh 4"
                idFile="link4"
                idButton="btnLink4"
                classButton="danger"
              />
            </div>
            <br />
            <br />
            <div className="form-floating">
              <textarea
                className="form-control"
                id="description"
                name="description"
                style={{ height: 150 }}
              ></textarea>
              <label htmlFor="description">Giới thiệu</label>
            </div>
            <br />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="primary">
          Thêm
        </Button>
        <Button variant="secondary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </>
  );
};

// const mapStatetoProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return {};
// };

export default FormSP;
