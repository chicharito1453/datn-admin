const Table = () => {
  return (
    <div style={{ height: "100vh" }} className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>SL</th>
            <th>Xuất xứ</th>
            <th>Loại</th>
            <th>NCC</th>
            <th>Ngày ĐK</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Surface Laptop 4 Ryzen 5</td>
            <td>27.000.000 đ</td>
            <td>3</td>
            <td>Trung Quốc</td>
            <td>Laptop</td>
            <td>Apple</td>
            <td>
              <i className="fas fa-edit"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Table;
