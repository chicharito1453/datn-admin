import Button from "react-bootstrap/Button";

const Image = ({
  classWraper = "col",
  src = "http://www.eurostrada.net/wp-content/uploads/2015/04/Image-Coming-Soon.png",
  text = "Chọn ảnh",
  classImg = "img-thumbnail",
  idFile,
  idButton,
  classButton,
  cssImage,
  styleWraper,
  changed,
}) => {
  return (
    <div align="center" style={styleWraper} className={classWraper}>
      <img style={cssImage} src={src} className={classImg} alt="..." />
      <input
        style={{ display: "none" }}
        id={idFile}
        accept="image/*"
        type="file"
        onChange={changed}
      />
      <Button
        id={idButton}
        variant={classButton}
        onClick={() => document.querySelector(`#${idFile}`).click()}
      >
        {text}
      </Button>
    </div>
  );
};
export default Image;
