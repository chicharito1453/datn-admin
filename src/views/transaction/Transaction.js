import { useState, useEffect, useCallback } from "react";
import okteamAPI from "../../utils/api/okteamAPI";
import Datatable from "../../utils/datatable/Datatable";
import { headingTran } from "../../utils/datatable/headings";
import configTran from "../../utils/datatable/config/configTran";
import { Fail } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";

const Transaction = () => {
  const [data, setData] = useState(null);

  // Lấy danh sách các giao dịch
  const list_transaction = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/transaction/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      setData([]);
      document.querySelector(".content").style.height = "auto";
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    setData(result);
    document.querySelector(".content").style.height = "auto";
    return true;
  }, []);

  useEffect(() => {
    document.title = "Quản trị - Nạp rút tiền";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    list_transaction();
  }, [list_transaction]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nạp rút tiền</h1>
      <br />
      <Datatable
        id="dataTable"
        headings={headingTran}
        data={data}
        config={configTran}
      />
    </div>
  );
};
export default Transaction;
