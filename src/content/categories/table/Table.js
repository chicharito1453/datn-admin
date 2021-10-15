const Table = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LT</td>
            <td>Laptop</td>
            <td>
              <i className="fas fa-edit"></i>
            </td>
          </tr>
          <tr>
            <td>TV</td>
            <td>Tivi</td>
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
