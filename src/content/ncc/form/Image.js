import { useEffect } from "react";

const Image = () => {
  useEffect(() => {
    const $ = document.querySelector.bind(document);

    $("#btnLogoNcc").onclick = function () {
      $("#inpFileNCC").click();
    };
  });

  return (
    <div align="center" className="col-sm-5">
      <div style={{ padding: 35 }} className="col-sm">
        <img
          id="ncclogo"
          src="https://i0.wp.com/beatroute.io/wp-content/uploads/2021/02/DMS-Page-Header-1-1.png?fit=700%2C600&ssl=1"
          className="img-thumbnail"
          alt="..."
        />
        <input
          id="inpFileNCC"
          style={{ display: "none" }}
          accept="image/*"
          type="file"
        />
        <button id="btnLogoNcc" type="button" className="btn btn-danger">
          Chọn hình ảnh
        </button>
      </div>
    </div>
  );
};
export default Image;
