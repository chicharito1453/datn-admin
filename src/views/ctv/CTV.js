import { useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ALL_CTV } from "../../store/action/index";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, isOK } from "../../utils/sweetalert2/alert";
import TableCtv from "./table/TableCtv";
import FormCtv from "./form/FormCtv";

const CTV = ({ data, getAllCtv }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  // DANH SÁCH CỘNG TÁC VIÊN
  const list_Ctv = useCallback(async () => {
    const [error, resp] = await okteamAPI("/ctv/list");
    if (error) {
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result, message } = resp.data;
    if (!isOK(message)) {
      Fail(message);
      return false;
    }
    getAllCtv(result);
    document.querySelector(".content").style.height = "auto";
  }, [getAllCtv]);

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Cộng tác viên";
    list_Ctv();
  }, [list_Ctv]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Cộng tác viên</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Thêm cộng tác viên
      </Button>
      <br />
      <br />
      <TableCtv data={data} />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm cộng tác viên</Modal.Title>
        </Modal.Header>
        <FormCtv close={handleClose} />
      </Modal>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.list_Ctv,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllCtv: (list) => {
      dispatch(ALL_CTV(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(CTV);
