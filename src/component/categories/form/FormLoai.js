import InputGroup from "../../../common/InputGroup";
import Button from "react-bootstrap/Button";
import Image from "../../../common/Image";
import { useState, useEffect, memo } from "react";

const FormLoai = ({ add }) => {
  const [temp, setTemp] = useState(null);
  const [formData, setFormData] = useState({
    idcate: "",
    typename: "",
    img: null,
    parent: "",
  });

  // TẠO IMAGE TẠM VÀ LƯU FILE VÀ FORMDATA
  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
    setFormData({ ...formData, img: file });
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
        value={formData.idcate}
        id="idcate"
        text="Mã loại"
        placeholder="Nhập mã loại"
      />
      <InputGroup
        changed={(e) => setFormData({ ...formData, typename: e.target.value })}
        value={formData.typename}
        id="typename"
        text="Tên loại"
        placeholder="Nhập tên loại"
      />
      <InputGroup
        changed={(e) => setFormData({ ...formData, parent: e.target.value })}
        value={formData.parent}
        id="parent"
        text="Loại cha"
        placeholder="Nhập loại cha"
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
        <Button
          variant="primary"
          onClick={() =>
            add(
              {
                ...formData,
                idcate: formData.idcate.toUpperCase(),
                parent: formData.parent.toUpperCase(),
              },
              setTemp,
              setFormData
            )
          }
        >
          Thêm
        </Button>
      </div>
    </form>
  );
};
export default memo(FormLoai);
