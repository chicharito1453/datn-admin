import InputGroup from "../../../common/InputGroup";
import Button from "react-bootstrap/Button";
import Image from "../../../common/Image";
import { useState, useEffect, memo } from "react";

const Form = ({ add }) => {
  const [temp, setTemp] = useState(null);
  const [formData, setFormData] = useState({
    idcate: "",
    typename: "",
    image: null,
    parent: "",
  });

  // TẠO IMAGE TẠM VÀ LƯU FILE VÀ FORMDATA
  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  }

  useEffect(() => {
    return () => {
      temp && URL.revokeObjectURL(temp); // hủy image tạm
    };
  });

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
        <Button variant="primary" onClick={() => add(formData)}>
          Thêm
        </Button>
      </div>
    </form>
  );
};
export default memo(Form);
