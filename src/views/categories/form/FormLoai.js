import React, { useState, useEffect, memo } from "react";
import { Modal, Button } from "react-bootstrap";
import InputGroup from "../../../components/InputGroup";
import Image from "../../../components/Image";

const FormLoai = ({ add, close }) => {
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

  function handleChangeLoai(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  }

  useEffect(() => {
    return () => {
      temp && URL.revokeObjectURL(temp); // hủy image tạm
    };
  }, [temp]);

  return (
    <>
      <Modal.Body>
        <form id="formLoai">
          <InputGroup
            name="idcate"
            value={formData.idcate}
            id="idcate"
            text="Mã loại"
            placeholder="Nhập mã loại"
            changed={handleChangeLoai}
          />
          <InputGroup
            value={formData.typename}
            id="typename"
            name="typename"
            text="Tên loại"
            placeholder="Nhập tên loại"
            changed={handleChangeLoai}
          />
          <InputGroup
            value={formData.parent}
            id="parent"
            name="parent"
            text="Loại cha"
            placeholder="Nhập loại cha"
            changed={handleChangeLoai}
          />
          <Image
            cssImage={{
              marginTop: 30,
              height: "60%",
              width: "100%",
            }}
            classImg=".img-fluid"
            classWraper="col"
            src={temp || "/assets/img/default.jpg"}
            text="Chọn hình ảnh"
            idFile="imageLoai"
            idButton="btnImage"
            classButton="danger"
            changed={handleImage}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() =>
            add({
              ...formData,
              idcate: formData.idcate.toUpperCase(),
              parent: formData.parent.toUpperCase(),
            })
          }
        >
          Thêm
        </Button>
        <Button variant="secondary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </>
  );
};
export default memo(FormLoai);
