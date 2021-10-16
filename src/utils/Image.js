import Button from "react-bootstrap/Button";
import { useEffect } from "react";

const Image = ({
  classWraper = "col",
  src = "http://www.eurostrada.net/wp-content/uploads/2015/04/Image-Coming-Soon.png",
  text = "Chọn ảnh",
  classImg = "img-thumbnail",
  idFile,
  idButton,
  classButton,
  cssImage,
}) => {
  useEffect(() => {
    const $ = document.querySelector.bind(document);
    $(`#${idButton}`).onclick = function () {
      $(`#${idFile}`).click();
    };
  }, [idButton, idFile]);

  return (
    <div align="center" className={classWraper}>
      <img style={cssImage} src={src} className={classImg} alt="..." />
      <input
        style={{ display: "none" }}
        id={idFile}
        accept="image/*"
        type="file"
      />
      <Button id={idButton} variant={classButton}>
        {text}
      </Button>
    </div>
  );
};
export default Image;
