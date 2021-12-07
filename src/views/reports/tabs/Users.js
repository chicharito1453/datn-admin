import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import callAPI from "../../../utils/api/callAPI";
import { Fail } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";

const Users = () => {
  const [nccs, setNccs] = useState(0);
  const [ctvs, setCtvs] = useState(0);

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
    setCtvs(data.total_ctv);
    setNccs(data.total_ncc);
    return true;
  }

  useEffect(() => {
    tracuu();
  }, []);

  return (
    <div className="row" style={{ height: 450 }}>
      <b>Tổng số người dùng: {nccs + ctvs}</b>
      <br />
      <b>Tỷ lệ cộng tác viên: {Math.floor((ctvs * 100) / (nccs + ctvs))} %</b>
      <br />
      <b>Tỷ lệ nhà cung cấp: {Math.round((nccs * 100) / (nccs + ctvs))} %</b>
      <div className="col">
        <Doughnut
          data={{
            labels: [`${ctvs} cộng tác viên`, `${nccs} nhà cung cấp`],
            datasets: [
              {
                label: "# of votes",
                data: [ctvs, nccs],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.8)",
                  "rgba(54, 162, 235, 0.8)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
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
export default Users;
