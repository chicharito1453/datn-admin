import { useEffect } from "react";

const Image = () => {
  useEffect(() => {
    const $ = document.querySelector.bind(document);
    $("#btnImage").onclick = function () {
      // chọn hình ảnh
      $("#inpFileCTV").click();
    };
  });

  return (
    <div align="center" className="col-sm-5">
      <div style={{ padding: 35 }} className="col-sm">
        <img
          id="image"
          src="https://www.meme-arsenal.com/memes/ff35be3515854271ec636c9f70987e34.jpg"
          className="img-thumbnail"
          alt="..."
        />
        <input
          id="inpFileCTV"
          style={{ display: "none" }}
          accept="image/*"
          type="file"
        />
        <button id="btnImage" type="button" className="btn btn-danger">
          Chọn hình ảnh
        </button>
      </div>
    </div>
  );
};
export default Image;
