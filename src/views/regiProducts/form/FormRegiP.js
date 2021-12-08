import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import okteamAPI from "../../../utils/api/okteamAPI";
import { Fail } from "../../../utils/sweetalert2/alert";
import {
  fetchingOn,
  fetchingOff,
} from "../../../utils/loading-overlay/loading-overlay";
import InputGroup from "../../../components/InputGroup";

const FormRegiP = ({ close, initValue, ctvs, add }) => {
  const [formData, setFormData] = useState(initValue);
  const [products, setProducts] = useState(null);

  function handleSelect(e, thaotac) {
    if (thaotac === "0") {
      setFormData({
        ...formData,
        username: { value: e.value, label: e.label },
      });
    } else {
      setFormData({
        ...formData,
        idpro: { value: e.value, label: e.label },
      });
    }
  }

  // select sp
  const select_pro = useCallback(async () => {
    fetchingOn();
    const [error, resp] = await okteamAPI("/products/list");
    if (error) {
      fetchingOff();
      Fail("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { result } = resp.data;

    fetchingOff();
    setProducts([
      { value: "", label: "Tất cả" },
      ...result.map((rs) => ({ value: rs.idpro, label: rs.name })),
    ]);
    return true;
  }, []);

  useEffect(() => {
    select_pro();
  }, [select_pro]);

  return (
    <>
      <Modal.Body>
        <form>
          <div className="row">
            <div className="col">
              <InputGroup
                id="idctv"
                type="select"
                name="idctv"
                text="Cộng tác viên"
                options={ctvs}
                value={formData.username}
                changed={(e) => handleSelect(e, "0")}
              />
            </div>
            <div className="col">
              <InputGroup
                id="idpro"
                type="select"
                name="idpro"
                text="Sản phẩm"
                options={products}
                value={formData.idpro}
                changed={(e) => handleSelect(e, "1")}
              />
            </div>
            <div className="col">
              <InputGroup
                id="price"
                type="number"
                name="price"
                text="Giá"
                min={0}
                value={formData.price}
                changed={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
          </div>
          <br />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="btnForm">
          <Button
            variant="primary"
            onClick={() =>
              add({
                ...formData,
                idpro: formData.idpro.value,
                username: formData.username.value,
              })
            }
          >
            Lưu
          </Button>
          <Button variant="secondary" onClick={close}>
            Đóng
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};
export default FormRegiP;
