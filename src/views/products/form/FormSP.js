import { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import okteamAPI from "../../../utils/api/okteamAPI";
import { Fail, isOK } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";
import Image from "../../../components/Image";
import InputGroup from "../../../components/InputGroup";

const FormSP = ({ close, saveAll, initValue, isUpdate }) => {
  const [Loais, setLoais] = useState(null);
  const [loaiLv2, setloaiLv2] = useState(null);
  const [allLoai, setAllLoai] = useState(null);
  const [idcate2, setIdcate2] = useState({ value: "", label: "Tất cả" });
  const [Nccs, setNccs] = useState(null);
  const [Nhans, setNhans] = useState(null);
  const [formData, setFormData] = useState(initValue);
  const [temp0, setTemp0] = useState(initValue.image0);
  const [temp1, setTemp1] = useState(initValue.image1);
  const [temp2, setTemp2] = useState(initValue.image2);
  const [temp3, setTemp3] = useState(initValue.image3);

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
  const onchangeLoai = useCallback(
    async (isFetch) => {
      if (isFetch) fetchingOn();
      const [error, resp] = await okteamAPI(
        `/brand/list${idcate2.value && `?idcate=${idcate2.value}`}`
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
    },
    [idcate2.value]
  );

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
    fetchingOff();
    const categories = result.filter((rs) => rs.lv === 1);
    const cateLv2 = idcate2.value
      ? result.filter((rs) => rs.parent === idcate2.value)
      : result.filter((rs) => rs.lv === 2);
    setLoais([
      { value: "", label: "Tất cả" },
      ...categories.map((cate) => ({
        value: cate.idcate,
        label: cate.typename,
      })),
    ]);
    setloaiLv2([
      { value: "", label: "Tất cả" },
      ...cateLv2.map((cate) => ({
        value: cate.idcate,
        label: cate.typename,
      })),
    ]);
    setAllLoai(result);
    if (isUpdate) {
      const cate = result.find((rs) => rs.idcate === formData.idcate.parent);
      setIdcate2({ value: cate.idcate, label: cate.typename });
    }
    onchangeLoai();
    return true;
  }, [onchangeLoai, idcate2.value, isUpdate, formData.idcate.parent]);

  // SET PRODUCT
  function handleChangeProduct(e) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "idpro" ? e.target.value.trim() : e.target.value,
    });
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
  function handleSelect(e, thaotac) {
    if (thaotac === "0") {
      setFormData({
        ...formData,
        idcate: { idcate: "", typename: "Tất cả" },
        idbrand: { id: "", name: "Tất cả" },
      });
      setIdcate2({ value: e.value, label: e.label });
      const list = allLoai.filter((rs) => rs.parent === e.value);
      setloaiLv2([
        { value: "", label: "Tất cả" },
        ...list.map((cate) => ({
          value: cate.idcate,
          label: cate.typename,
        })),
      ]);
      onchangeLoai(true);
    } else if (thaotac === "1") {
      setFormData({ ...formData, idbrand: { id: e.value, name: e.label } });
    } else if (thaotac === "2") {
      setFormData({
        ...formData,
        idcate: { idcate: e.value, typename: e.label },
      });
    } else {
      setFormData({
        ...formData,
        username: { username: e.value, nccname: e.label },
      });
    }
  }

  // SET TRẠNG THÁI
  function handletActive(e) {
    setFormData({ ...formData, active: e.target.value === "1" });
  }

  // rút gọn formData để thao tác
  function compactFormData() {
    return {
      ...formData,
      name: formData.name.trim(),
      origin: formData.origin.trim(),
      dvt: formData.dvt.trim(),
      tags: formData.tags.trim(),
      idcate: idcate2.value ? formData.idcate.idcate : null,
      idbrand: formData.idbrand.id,
      username: formData.username.username,
      description: formData.description.trim().replace(/\r\n|\r|\n/g, "<br />"),
    };
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
              id="idpro"
              name="idpro"
              text="Mã sản phẩm"
              value={formData.idpro}
              changed={handleChangeProduct}
              disabled={isUpdate}
            />
            <InputGroup
              id="name"
              name="name"
              text="Tên sản phẩm"
              value={formData.name}
              changed={handleChangeProduct}
            />
            <InputGroup
              id="pricectv"
              name="pricectv"
              text="Giá"
              type="number"
              min="0"
              value={formData.pricectv}
              changed={handleChangeProduct}
            />
            <InputGroup
              id="qty"
              name="qty"
              text="Số lượng"
              type="number"
              min="0"
              value={formData.qty}
              changed={handleChangeProduct}
            />
            <InputGroup
              id="origin"
              name="origin"
              text="Nơi sản xuất"
              value={formData.origin}
              changed={handleChangeProduct}
            />
            <InputGroup
              id="dvt"
              name="dvt"
              text="Đơn vị tính"
              value={formData.dvt}
              changed={handleChangeProduct}
            />
            <InputGroup
              id="tags"
              name="tags"
              text="Tags"
              value={formData.tags}
              changed={handleChangeProduct}
            />
            <div className="row">
              <InputGroup
                id="idcate"
                type="select"
                name="idcate"
                text="Loại hàng"
                options={Loais}
                value={idcate2}
                changed={(e) => {
                  handleSelect(e, "0");
                }}
              />
              <InputGroup
                id="idcate2"
                type="select"
                name="idcate2"
                text="Loại chi tiết"
                options={loaiLv2}
                value={{
                  value: formData.idcate.idcate,
                  label: formData.idcate.typename,
                }}
                changed={(e) => handleSelect(e, "2")}
              />
              <InputGroup
                id="idbrand"
                type="select"
                name="idbrand"
                text="Nhãn hiệu"
                options={Nhans}
                value={{
                  value: formData.idbrand.id,
                  label: formData.idbrand.name,
                }}
                changed={(e) => {
                  handleSelect(e, "1");
                }}
              />
              <InputGroup
                id="username"
                type="select"
                name="username"
                text="Nhà cung cấp"
                options={Nccs}
                value={{
                  value: formData.username.username,
                  label: formData.username.nccname,
                }}
                changed={(e) => {
                  handleSelect(e, "3");
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
                text="Mở bán"
                value="1"
                labelClass="form-check-label"
                elementClass="form-check-input"
                type="radio"
                isChecked={formData.active && "checked"}
                changed={handletActive}
              />
              <InputGroup
                nameClass="form-check form-check-inline"
                id="nonactive"
                name="active"
                text="Không mở bán"
                value="0"
                labelClass="form-check-label"
                elementClass="form-check-input"
                type="radio"
                isChecked={!formData.active && "checked"}
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
                value={formData.description}
                onChange={handleChangeProduct}
              ></textarea>
              <label htmlFor="description">Mô tả</label>
            </div>
            <br />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="btnForm">
          {!isUpdate ? (
            <Button
              variant="primary"
              onClick={() =>
                saveAll(compactFormData(), "/products/add", "POST")
              }
            >
              Thêm
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() =>
                saveAll(compactFormData(), "/products/update-all", "PUT")
              }
            >
              Sửa
            </Button>
          )}
          <Button variant="secondary" onClick={close}>
            Đóng
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};
export default FormSP;
