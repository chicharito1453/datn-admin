import { Modal, Button } from "react-bootstrap";
import Image from "../../../components/Image";
import InputGroup from "../../../components/InputGroup";

const categoties = [
  { id: "LT", name: "Laptop" },
  { id: "TV", name: "Tivi" },
];

const ncc = [
  { id: "gg123", name: "Google" },
  { id: "ap123", name: "Apple" },
];

const FormSP = ({ close }) => {
  return (
    <>
      <Modal.Body>
        <form id="productForm">
          <div className="col">
            <InputGroup id="name" text="Tên sản phẩm" />
            <InputGroup
              id="price"
              text="Giá"
              valueD={0}
              type="number"
              min="0"
            />
            <InputGroup
              id="soluong"
              text="Số lượng"
              valueD={0}
              type="number"
              min="0"
            />
            <InputGroup id="origin" text="Xuất xứ" />
            <InputGroup id="origin" text="Thuộc tính phụ" />
            <div className="row">
              <div className="col">
                <InputGroup
                  id="category"
                  type="select"
                  text="Loại hàng"
                  options={categoties}
                />
              </div>
              <div className="col">
                <InputGroup
                  id="ncc"
                  type="select"
                  text="Nhà cung cấp"
                  options={ncc}
                />
              </div>
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
export default FormSP;
