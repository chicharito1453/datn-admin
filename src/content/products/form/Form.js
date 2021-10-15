import Images from "./Images";
import InputGroup from "../../../utils/InputGroup";
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
    <form id="productForm">
      <div className="col-sm">
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
        <Images />
        <Description />
        <br />
        <div className="btnForm">
          <Button type="reset" variant="primary">
            Mới
          </Button>
          <Button type="button" variant="primary">
            Thêm
          </Button>
        </div>
      </div>
    </form>
  );
};
export default Form;
