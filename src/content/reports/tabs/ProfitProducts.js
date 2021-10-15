const ProfitProducts = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="tabpanel">
          <tr>
            <th>SẢN PHẨM</th>
            <th>LOẠI HÀNG</th>
            <th>TỔNG BÁN</th>
            <th>TỔNG THU</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="item in pagerP.items track by item.group.id">
            <td>
              <img
                src="https://cellphones.com.vn/media/catalog/product/l/a/laptop-surface-4-01.jpg"
                width="50"
                alt=""
                className="img img-thumbnail pull-left"
              />
              <span className="pull-left cart-product-option">
                <strong>Surface Laptop 4 Ryzen 5</strong>
                <br />
              </span>
              <div className="clearfix"></div>
            </td>
            <td>Laptop</td>
            <td>1</td>
            <td>27.000.000 đ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ProfitProducts;
