const Details = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Nhãn hàng</th>
            <th>Số lượng</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="http://www.eurostrada.net/wp-content/uploads/2015/04/Image-Coming-Soon.png"
                width="50"
                alt=""
                className="img img-thumbnail pull-left"
              />{" "}
              <span className="pull-left cart-product-option">
                {" "}
                <strong>Surface Laptop 4 Ryzen 5</strong>
                <br />
              </span>
              <div className="clearfix"></div>
            </td>
            <td>Laptop</td>
            <td>1</td>
            <td>27.000.000 đ</td>
          </tr>
          <tr>
            <th style={{ color: "red", fontWeight: 700 }}>Tổng</th>
            <th></th>
            <th style={{ color: "red", fontWeight: 700 }}>1</th>
            <th style={{ color: "red", fontWeight: 700 }}>27.000.000 đ</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Details;
