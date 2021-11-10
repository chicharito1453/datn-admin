import Image from "../../../components/Image";
import InputGroup from "../../../components/InputGroup";
import Description from "./Description";
import Button from "react-bootstrap/Button";

const categoties = [
  { id: "LT", name: "Laptop" },
  { id: "TV", name: "Tivi" },
];

const ncc = [
  { id: "gg123", name: "Google" },
  { id: "ap123", name: "Apple" },
];

const Form = () => {
  return (
    <form style={{ width: "70%", textAlign: "left" }} id="productForm">
      <div className="col-sm">
        {/* Trường dữ liệu */}
        <InputGroup id="name" text="Tên sản phẩm" />
        <InputGroup id="price" text="Giá" valueD={0} type="number" min="0" />
        <InputGroup
          id="soluong"
          text="Số lượng"
          valueD={0}
          type="number"
          min="0"
        />
        <InputGroup id="origin" text="Xuất xứ" />
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
        {/* Hình ảnh */}
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
        </div>
        <Description />
        <br />
        {/* Nút */}
        <div className="btnForm">
          <Button type="button" variant="primary">
            Thêm
          </Button>
        </div>
      </div>
    </form>
  );
};
export default Form;
