import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { getToken } from "../../../utils/localStorage/localStorage";
import { decodeToken } from "react-jwt";
import InputGroup from "../../../components/InputGroup";
import Image from "../../../components/Image";

const FormPost = ({ close, add }) => {
  const [temp, setTemp] = useState(null);
  const [formData, setFormData] = useState({
    idpost: null,
    username: decodeToken(getToken()).jti,
    title: "",
    content: "",
    image: null,
  });

  function handleChangeForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    const file = e.target.files[0];
    setTemp(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  }
  useEffect(() => {
    return () => temp && URL.revokeObjectURL(temp);
  }, [temp]);
  return (
    <>
      <Modal.Body>
        <div className="row">
          <div className="col">
            <form
              style={{
                fontSize: 15,
                marginLeft: "10%",
              }}
              id="ctvForm"
            >
              <InputGroup
                id="title"
                name="title"
                text="Tiêu đề"
                value={formData.title}
                changed={handleChangeForm}
              />
              <br />
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="content"
                  name="content"
                  style={{ height: 200 }}
                  value={formData.content}
                  onChange={handleChangeForm}
                ></textarea>
                <label htmlFor="content">Nhập nội dung bài viết</label>
              </div>
              <br />
            </form>
          </div>
          <Image
            cssImage={{
              marginTop: 30,
              height: "65%",
              width: "80%",
            }}
            classImg=".img-fluid"
            classWraper="col-sm-5"
            src={temp || "/assets/img/default.jpg"}
            text="Chọn hình ảnh"
            idFile="image"
            idButton="btnImage"
            classButton="danger"
            changed={handleImage}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() =>
            add({
              ...formData,
              title: formData.title.trim(),
              content: formData.content.trim(),
            })
          }
        >
          Tạo
        </Button>
        <Button variant="secondary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </>
  );
};
export default FormPost;
