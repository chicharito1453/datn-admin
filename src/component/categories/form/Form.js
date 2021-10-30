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
    idcate: "",
    typename: "",
    image: null,
    parent: "",
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
        changed={(e) => setFormData({ ...formData, idcate: e.target.value })}
        value={formData.maloai}
        id="idcate"
        text="Mã loại"
      />
      <InputGroup
        changed={(e) => setFormData({ ...formData, typename: e.target.value })}
        id="typename"
        text="Tên loại"
      />
      <InputGroup
        changed={(e) => setFormData({ ...formData, parent: e.target.value })}
        id="parent"
        text="Menu"
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
