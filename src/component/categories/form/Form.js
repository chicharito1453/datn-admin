import InputGroup from "../../../common/InputGroup";
import Button from "react-bootstrap/Button";
import Image from "../../../common/Image";
import { useState, useEffect } from "react";

const Form = () => {
  useEffect(() => {
    return () => {
      temp && URL.revokeObjectURL(temp);
    };
  });

  const [formData, setFormData] = useState({
    maloai: "",
    tenloai: "",
    image: "",
  });
  const [file, setFile] = useState();
  const [temp, setTemp] = useState(null);

  function handleImage(e) {
    const image = e.target.files[0];
    setTemp(URL.createObjectURL(image));
    setFile(image);
    console.log(file);
  }

  return (
    <form id="formLoai">
      <InputGroup
        changed={(e) => setFormData({ ...formData, maloai: e.target.value })}
        value={formData.maloai}
        id="maloai"
        text="Mã loại"
      />
      <InputGroup
        changed={(e) => setFormData({ ...formData, tenloai: e.target.value })}
        id="tenloai"
        text="Tên loại"
      />
      <Image
        styleWraper={{ marginLeft: "30%" }}
        cssImage={{
          marginTop: 30,
          height: "60%",
          width: "90%",
        }}
        classImg=".img-fluid"
        classWraper="col-sm-5"
        src={temp || "/assets/img/default.jpg"}
        text="Chọn hình ảnh"
        idFile="imageLoai"
        idButton="btnImage"
        classButton="danger"
        changed={handleImage}
      />
      <br />
      <div className="btnForm">
        <Button variant="primary" onClick={() => console.log(formData)}>
          Thêm
        </Button>
      </div>
    </form>
  );
};
export default Form;
