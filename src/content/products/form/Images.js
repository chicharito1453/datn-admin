import { useEffect } from "react";

const Images = () => {
  useEffect(() => {
    const $ = document.querySelector.bind(document);
    // image 1
    $("#btnLink1").onclick = function () {
      $("#link1").click();
    };
    // image 2
    $("#btnLink2").onclick = function () {
      $("#link2").click();
    };
    // image 3
    $("#btnLink3").onclick = function () {
      $("#link3").click();
    };
  });

  return (
    <div className="row">
      <div align="center" className="col">
        {/* <!-- image 1 --> */}
        <img
          src="http://www.eurostrada.net/wp-content/uploads/2015/04/Image-Coming-Soon.png"
          className="img-thumbnail"
          alt="..."
        />
        <input
          id="link1"
          className="form-control"
          accept="image/*"
          type="file"
        />
        <button id="btnLink1" type="button" className="btn btn-danger">
          Chọn ảnh 1
        </button>
      </div>
      <div align="center" className="col">
        {/* <!-- image 2 --> */}
        <img
          src="http://www.eurostrada.net/wp-content/uploads/2015/04/Image-Coming-Soon.png"
          className="img-thumbnail"
          alt="..."
        />
        <input
          id="link2"
          className="form-control"
          accept="image/*"
          type="file"
        />
        <button id="btnLink2" type="button" className="btn btn-danger">
          Chọn ảnh 2
        </button>
      </div>
      {/* <!-- image 3 --> */}
      <div align="center" className="col">
        <img
          src="http://www.eurostrada.net/wp-content/uploads/2015/04/Image-Coming-Soon.png"
          className="img-thumbnail"
          alt="..."
        />
        <input
          id="link3"
          className="form-control"
          accept="image/*"
          type="file"
        />
        <button id="btnLink3" type="button" className="btn btn-danger">
          Chọn ảnh 3
        </button>
      </div>
    </div>
  );
};
export default Images;
