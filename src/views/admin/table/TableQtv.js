import { memo } from "react";

const TableQtv = () => {
  return (
    <div className="table-responsive" style={{ height: "100vh" }}>
      <table className="table">
        <thead>
          <tr>
            <th>CTV</th>
            <th>Khách</th>
            <th>Sđt khách</th>
            <th>SL</th>
            <th>Ngày đặt</th>
            <th>Địa chỉ</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>dinh1</td>
            <td>Trần Văn A</td>
            <td>1111113333</td>
            <td>1</td>
            <td>11/11/2089</td>
            <td>Cần Thơ</td>
            <td>27.000.000 đ</td>
            <td>Đã thanh toán</td>
            <td>
              <i className="fas fa-edit"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default memo(TableQtv);
