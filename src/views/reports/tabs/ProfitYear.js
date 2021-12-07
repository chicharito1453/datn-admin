import { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Button } from "react-bootstrap";
import ChartDataLabels from "chartjs-plugin-datalabels";
import InputGroup from "../../../components/InputGroup";
import callAPI from "../../../utils/api/callAPI";
import { Fail, Info } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";

const ProfitYear = () => {
  const [profits, setProfits] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [options, setOptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState({ value: "", label: "Tất cả" });

  // SELECT YEAR
  const select_years = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await callAPI(
      `${process.env.REACT_APP_PROXY}/admin/report/allYears`
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    setOptions([
      { value: "", label: "Tất cả" },
      ...result.map((rs) => ({ value: rs, label: rs })),
    ]);
    return true;
  }, []);

  // TRA CỨU
  async function tracuu() {
    if (!value.value) {
      Info("Chọn năm cần tra cứu!");
      return false;
    }
    fetchingOn();
    const [error, resp] = await callAPI(
      `${process.env.REACT_APP_PROXY}/admin/report/year/${value.value}`
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    const list = [
      ...result.map((rs) => {
        if (!rs) return 0;
        return rs.sum;
      }),
    ];
    setProfits(list);
    setTotal(list.reduce((total, current) => total + current));
    return true;
  }

  useEffect(() => {
    select_years();
  }, [select_years]);

  return (
    <>
      <div className="row">
        <div className="col">
          <InputGroup
            id="years"
            type="select"
            name="years"
            text="Năm"
            value={value}
            options={options}
            changed={(e) => setValue({ value: e.value, label: e.label })}
          />
        </div>
        <div className="col">
          <Button style={{ marginTop: 32 }} variant="primary" onClick={tracuu}>
            Tra cứu
          </Button>
        </div>
      </div>
      <br />
      <div align="right" className="row">
        <b>Tổng doanh thu năm: {total}</b>
      </div>
      <br />
      <div className="row" style={{ height: 450 }}>
        <div className="col">
          <Bar
            data={{
              labels: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
              ],
              datasets: [
                {
                  label: "Doanh thu theo tháng",
                  data: profits,
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                  ],
                  borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(54, 162, 235, 1)",
                  ],
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
    </>
  );
};
export default ProfitYear;
