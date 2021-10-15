const Table = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Tài khoản</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Ngày tạo</th>
            <th>Giới thiệu</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>gg123</td>
            <td>Google</td>
            <td>google@gmail.com</td>
            <td>1111111111</td>
            <td>Mỹ</td>
            <td>03-08-2025</td>
            <td>Công ty hàng đầu thế giới</td>
            <td>
              <i className="fas fa-edit"></i>
            </td>
          </tr>
          <tr>
            <td>apple33</td>
            <td>Apple</td>
            <td>apple@gmail.com</td>
            <td>33333333333</td>
            <td>Mỹ</td>
            <td>03-08-2026</td>
            <td>Công ty hàng đầu thế giới</td>
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
