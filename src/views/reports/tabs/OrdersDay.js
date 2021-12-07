import { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Button } from "react-bootstrap";
import callAPI from "../../../utils/api/callAPI";
import { Fail } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";

const OrdersDay = () => {
  const [formDaTa, setFormDaTa] = useState([]);
  const [count, setCount] = useState(0);

  // thiết lập ngầy tháng
  const setDate = useCallback(async () => {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var today =
      d.getFullYear() +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;
    document.querySelector("#date").value = today;
    tracuu();
  }, []);

  // tra cứu đơn hàng theo ngày
  async function tracuu() {
    const nam = Number(document.querySelector("#date").value.split("-")[0]);
    const thang = Number(document.querySelector("#date").value.split("-")[1]);
    const ngay = Number(document.querySelector("#date").value.split("-")[2]);
    fetchingOn();
    const [error, resp] = await callAPI(
      `${process.env.REACT_APP_PROXY}/admin/report?d=${ngay}&m=${thang}&y=${nam}`
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { data } = resp;
    fetchingOff();
    setFormDaTa([
      data.count_order0,
      data.count_order1,
      data.count_order2,
      data.count_order3,
      data.count_order4,
      data.count_order5,
    ]);
    setCount(
      data.count_order0 +
        data.count_order1 +
        data.count_order2 +
        data.count_order3 +
        data.count_order4 +
        data.count_order5
    );
    return true;
  }

  useEffect(() => {
    setDate();
  }, [setDate]);

  return (
    <div className="row" style={{ height: 450 }}>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="date">Từ ngày</label>
            <input type="date" name="date" id="date" className="form-control" />
          </div>
        </div>
        <div className="col">
          <Button style={{ marginTop: 23 }} variant="primary" onClick={tracuu}>
            Tra cứu
          </Button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div align="right" className="row">
        <b>Tổng số đơn hàng trong ngày: {count}</b>
      </div>
      <br />
      <br />
      <div className="col">
        <Bar
          data={{
            labels: [
              "Chờ xác nhận",
              "Giao thành công",
              "Đang giao",
              "Trả về",
              "Hủy",
              "Đã thanh toán",
            ],
            datasets: [
              {
                label: "Số đơn hàng",
                data: formDaTa,
                backgroundColor: ["rgba(54, 162, 235, 0.8)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                display: true,
                color: "black",
                font: { size: "14" },
              },
            },
          }}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  );
};
export default OrdersDay;
