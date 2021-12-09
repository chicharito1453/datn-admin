import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_REGIP } from "../../store/action/index";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, isOK, Success, Approve } from "../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../utils/loading-overlay/loading-overlay";
import FormRegiP from "./form/FormRegiP";
import TabelRegiP from "./table/TableRegiP";
import InputGroup from "../../components/InputGroup";

const initialState = {
  idpro: {
    value: "",
    label: "Tất cả",
  },
  username: {
    value: "",
    label: "Tất cả",
  },
  price: 0,
  sl: 0,
};

const RegiProducts = ({ data, getALLRegiP }) => {
  const [show, setShow] = useState(false);
  const [ctvs, setCtvs] = useState(null);
  const [idctv, setIdctv] = useState({ value: "", label: "Tất cả" });

  // danh sach sp dangky
  const onChangeCtv = useCallback(
    async (e) => {
      const username = e ? e.value : "";
      fetchingOn();
      const [error, resp] = await okteamAPI(
        `/regi_products/list${username && `?username=${username}`}`
      );
      if (error) {
        fetchingOff();
        Fail("Không thực hiện được thao tác!");
        console.log(error);
        return false;
      }
      const { result } = resp.data;
      fetchingOff();
      setIdctv(e);
      getALLRegiP(result);
      document.querySelector(".content").style.height = "auto";
      return true;
    },
    [getALLRegiP]
  );

  // select ctv
  const select_ctv = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/ctv/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      getALLRegiP([]);
      document.querySelector(".content").style.height = "auto";
      return false;
    }
    const { result } = resp.data;
    fetchingOff();
    setCtvs([
      { value: "", label: "Tất cả" },
      ...result.map((rs) => ({ value: rs.username, label: rs.username })),
    ]);
    onChangeCtv();
    return true;
  }, [getALLRegiP, onChangeCtv]);

  // check form
  function check_from(formData) {
    if (!formData.username) {
      Fail("Chưa chọn cộng tác viên!");
      return false;
    }
    if (!formData.idpro) {
      Fail("Chưa chọn sản phẩm!");
      return false;
    }
    if (!formData.price || +formData.price < 0) {
      Fail("Giá đăng ký không hợp lệ!");
      return false;
    }
    return true;
  }

  // them dang ky
  async function them_dangky(formData) {
    if (!check_from(formData)) return;
    formData = { ...formData, price: +formData.price };
    fetchingOn();
    const [error, resp] = await okteamAPI(
      `/regi_products/add${idctv ? `?idctv=${idctv.value}` : ""}`,
      "POST",
      formData
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
    Success("Thêm đăng ký thành công!");
    getALLRegiP(result);
    setShow(false);
    return true;
  }

  // xoa dang ky
  async function xoa_dangky(regi) {
    Approve(
      "Bạn đang thực hiện xóa đăng ký này.\nTiếp tục thực hiện ?",
      async () => {
        fetchingOn();
        const [error, resp] = await okteamAPI(
          `/regi_products/delete?idregi=${regi.idregi}${
            idctv ? `&idctv=${idctv.value}` : ""
          }`,
          "DELETE"
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
        Success("Xóa đăng ký thành công!");
        getALLRegiP(result);
        return true;
      }
    );
  }

  useEffect(() => {
    document.title = "Quản trị - Đăng ký sản phẩm";
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
    select_ctv();
  }, [select_ctv]);

  function handleClose() {
    setShow(false);
  }

  return (
    <div className="container">
      <h1 className="hit-the-floor">Đăng ký sản phẩm</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Thêm đăng ký
      </Button>
      <br />
      <br />
      <div className="row">
        <div className="col-4">
          <InputGroup
            id="idctv"
            type="select"
            name="idctv"
            text="Cộng tác viên"
            options={ctvs}
            value={idctv}
            changed={onChangeCtv}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <TabelRegiP data={data} deleted={xoa_dangky} />
      </div>
      <Modal
        size="lg"
        show={show}
        centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký sản phẩm</Modal.Title>
        </Modal.Header>
        <FormRegiP
          close={handleClose}
          add={them_dangky}
          initValue={initialState}
          ctvs={ctvs}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.list_regi,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getALLRegiP: (list) => {
      dispatch(ALL_REGIP(list));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegiProducts);
