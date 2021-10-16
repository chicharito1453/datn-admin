import Image from "../../../utils/Image";

const ImagesGroup = () => {
  return (
    <div className="row">
      <Image
        text="Chọn ảnh 1"
        idFile="link1"
        idButton="btnLink1"
        classButton="danger"
      />
      <Image
        text="Chọn ảnh 2"
        idFile="link2"
        idButton="btnLink2"
        classButton="danger"
      />
      <Image
        text="Chọn ảnh 3"
        idFile="link3"
        idButton="btnLink3"
        classButton="danger"
      />
    </div>
  );
};
export default ImagesGroup;
