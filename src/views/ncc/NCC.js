import { useEffect, useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import FormNcc from "./form/FormNcc";
import TableNcc from "./table/TableNcc";
import Button from "react-bootstrap/Button";
import okteamAPI from "../../utils/api/okteamAPI";
import { Fail, isOK } from "../../utils/sweetalert2/alert";
import { ALL_NCC } from "../../store/action";

const NCC = ({ data, getAllNCC }) => {
  const [show, setShow] = useState(false);

  // DANH SÁCH LOẠI
  const list_Ncc = useCallback(async () => {
    const [error, resp] = await okteamAPI("/ncc/list");
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
    getAllNCC(result);
    const browserHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;
    document.querySelector(".content").style.height =
      contentHeight >= browserHeight ? "auto" : browserHeight + 60 + "px";
  }, [getAllNCC]);

  useEffect(() => {
    if (!document.title) document.title = "Quản trị - Nhà cung cấp";
    list_Ncc();
  }, [list_Ncc]);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhà cung cấp</h1>
      <Button
        style={{ float: "right" }}
        variant="primary"
        onClick={() => setShow(!show)}
      >
        Thêm Nhà cung cấp
      </Button>
      <br />
      <br />
      <TableNcc data={data} />
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhà cung cấp</Modal.Title>
        </Modal.Header>
        <FormNcc close={() => setShow(false)} />
      </Modal>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    data: state.list_Ncc,
  };
};

const mapDispatchToProps = (dispath, props) => {
  return {
    getAllNCC: (list) => {
      dispath(ALL_NCC(list));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(NCC);
