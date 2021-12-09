import { useState, useEffect, useCallback } from "react";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, isOK } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import Datatable from "../../utils/datatable/Datatable";
import { headingCmts } from "../../utils/datatable/headings";
import configCmts from "../../utils/datatable/config/configCmts";
import InputGroup from "../../components/InputGroup";

const Comments = () => {
  const [products, setProducts] = useState(null);
  const [data, setData] = useState(null);
  const [sp, setSp] = useState({
    value: "",
    label: "Tất cả",
  });

  const onChangePro = useCallback(async (e) => {
    const idpro = e ? e.value : "";
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/comments/list${idpro && `?idpro=${idpro}`}`
    );
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      fetchingOff();
      Fail(message);
      return false;
    }
    fetchingOff();
    setData(result);
    setSp(e);
    document.querySelector(".content").style.height = "auto";
    return true;
  }, []);

  // select sp
  const select_pro = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/products/list");
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
    setProducts([
      { value: "", label: "Tất cả" },
      ...result.map((rs) => ({ value: rs.idpro, label: rs.name })),
    ]);
    onChangePro();
    return true;
  }, [onChangePro]);

  useEffect(() => {
    document.title = "Quản trị - Bình luận";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    select_pro();
  }, [select_pro]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Bình luận</h1>
      <div className="row">
        <div className="col-4">
          <InputGroup
            id="idpro"
            type="select"
            name="idpro"
            text="Sản phẩm"
            options={products}
            value={sp}
            changed={onChangePro}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <Datatable
          id="dataTable"
          headings={headingCmts}
          data={data}
          config={configCmts}
        />
      </div>
    </div>
  );
};
export default Comments;
