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

const initialState = {
  name: "",
  pricetv: "",
  qty: "",
  origin: "",
  dvt: "",
  tags: "",
  category: { idcate: "" },
  p_brand: { id: "" },
  ncc: { username: "" },
  active: null,
  image0: null,
  image1: null,
  image2: null,
  image3: null,
  description: "",
};

const FormSP = ({ close }) => {
  const [Loais, setLoais] = useState(null);
  const [Nccs, setNccs] = useState(null);
  const [Nhans, setNhans] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [temp0, setTemp0] = useState(null);
  const [temp1, setTemp1] = useState(null);
  const [temp2, setTemp2] = useState(null);
  const [temp3, setTemp3] = useState(null);

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
  const onchangeLoai = useCallback(async (idcate = "", isFetch) => {
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

  // SET PRODUCT
  function handleChangeProduct(e) {
    console.log(e.target.value, typeof e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // SET IMAGE
  function handleImage(e, thaotac) {
    const file = e.target.files[0];
    if (thaotac === "0") {
      setTemp0(URL.createObjectURL(file));
      setFormData({ ...formData, image0: file });
    }
    if (thaotac === "1") {
      setTemp1(URL.createObjectURL(file));
      setFormData({ ...formData, image1: file });
    }
    if (thaotac === "2") {
      setTemp2(URL.createObjectURL(file));
      setFormData({ ...formData, image2: file });
    }
    if (thaotac === "3") {
      setTemp3(URL.createObjectURL(file));
      setFormData({ ...formData, image3: file });
    }
  }

  // SET SELECT
  function handleSelect(value, thaotac) {
    if (thaotac === "0") {
      setFormData({ ...formData, category: { idcate: value } });
    } else if (thaotac === "1") {
      setFormData({ ...formData, p_brand: { id: value } });
    } else {
      setFormData({ ...formData, ncc: { username: value } });
    }
  }

  // SET TRẠNG THÁI
  function handletActive(e) {
    setFormData({ ...formData, active: e.target.value === "1" });
  }

  useEffect(() => {
    select_ncc();
    select_category();
    return () => {
      temp0 && URL.revokeObjectURL(temp0);
      temp1 && URL.revokeObjectURL(temp1);
      temp2 && URL.revokeObjectURL(temp2);
      temp3 && URL.revokeObjectURL(temp3);
    };
  }, [select_category, select_ncc, temp0, temp1, temp2, temp3]);

  return (
    <>
      <Modal.Body>
        <form id="productForm">
          <div className="col">
            <InputGroup
              id="name"
              name="name"
              text="Tên sản phẩm"
              changed={handleChangeProduct}
            />
            <InputGroup
              id="pricetv"
              name="pricetv"
              text="Giá"
              type="number"
              min="0"
              changed={handleChangeProduct}
            />
            <InputGroup
              id="qty"
              name="qty"
              text="Số lượng"
              type="number"
              min="0"
              changed={handleChangeProduct}
            />
            <InputGroup
              id="origin"
              name="origin"
              text="Xuất xứ"
              changed={handleChangeProduct}
            />
            <InputGroup
              id="dvt"
              name="dvt"
              text="Đơn vị tính"
              changed={handleChangeProduct}
            />
            <InputGroup
              id="tags"
              name="tags"
              text="Tags"
              changed={handleChangeProduct}
            />
            <div className="row">
              <InputGroup
                id="category"
                type="select"
                name="category"
                text="Loại hàng"
                placeholder="Tên loại"
                options={Loais}
                changed={(value) => {
                  handleSelect(value, "0");
                  if (onchangeLoai(value, true)) handleSelect("", "1");
                }}
              />
              <InputGroup
                id="p_brand"
                type="select"
                name="p_brand"
                text="Nhãn hàng"
                placeholder="Tên nhãn"
                options={Nhans}
                changed={(value) => {
                  handleSelect(value, "1");
                }}
              />
              <InputGroup
                id="ncc"
                type="select"
                name="ncc"
                text="Nhà cung cấp"
                placeholder="Tên nhà cung cấp"
                options={Nccs}
                changed={(value) => {
                  handleSelect(value, "2");
                }}
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
                changed={handletActive}
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
                changed={handletActive}
              />
            </div>
            <br />
            <div className="row">
              <Image
                text="Chọn ảnh 1"
                idFile="link1"
                idButton="btnLink1"
                classButton="danger"
                src={temp0 || "/assets/img/default.jpg"}
                changed={(e) => handleImage(e, "0")}
              />
              <Image
                text="Chọn ảnh 2"
                idFile="link2"
                idButton="btnLink2"
                classButton="danger"
                src={temp1 || "/assets/img/default.jpg"}
                changed={(e) => handleImage(e, "1")}
              />
              <Image
                text="Chọn ảnh 3"
                idFile="link3"
                idButton="btnLink3"
                classButton="danger"
                src={temp2 || "/assets/img/default.jpg"}
                changed={(e) => handleImage(e, "2")}
              />
              <Image
                text="Chọn ảnh 4"
                idFile="link4"
                idButton="btnLink4"
                classButton="danger"
                src={temp3 || "/assets/img/default.jpg"}
                changed={(e) => handleImage(e, "3")}
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
                onChange={handleChangeProduct}
              ></textarea>
              <label htmlFor="description">Giới thiệu</label>
            </div>
            <br />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => console.log(formData)}>
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
