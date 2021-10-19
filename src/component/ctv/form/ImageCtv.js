import Image from "../../../common/Image";

const ImageCtv = () => {
  return (
    <Image
      cssImage={{ marginTop: 30, height: "60%", width: "90%", float: "right" }}
      classImg=".img-fluid"
      classWraper="col-sm-5"
      src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Portrait-as-an-artist-as-a-young-man.jpg"
      text="Chọn hình ảnh"
      idFile="inpFileCTV"
      idButton="btnImage"
      classButton="danger"
    />
  );
};
export default ImageCtv;
