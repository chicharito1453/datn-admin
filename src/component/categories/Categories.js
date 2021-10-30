import Form from "./form/Form";
import Table from "./table/Table";
import Button from "react-bootstrap/Button";
import reducerLoai from "../../reducer/reducerLoai";
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useReducer,
} from "react";

export const Tabledata = React.createContext();

const Categories = () => {
  const [show, setShow] = useState(false);
  const [data, dispatch] = useReducer(reducerLoai, []);

  const setHeight = useCallback(() => {
    // Resize sử dụng show làm dependencies
    window.onresize = function () {};
    const browserHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;
    const height = contentHeight >= browserHeight ? "auto" : browserHeight;
    document.querySelector(".content").style.height = show
      ? "auto"
      : height + "px";
  }, [show]);

  useLayoutEffect(() => {
    if (!document.title) document.title = "Quản trị - Loại hàng";
    dispatch({ type: "GETLIST" });
    setHeight();
  }, [setHeight]);

  return (
    <Tabledata.Provider value={{ data }}>
      <div className="container">
        <h1 className="hit-the-floor">Loại sản phẩm</h1>
        <Button
          style={{ float: "right" }}
          variant="primary"
          onClick={() => setShow(!show)}
        >
          {!show ? "Thêm loại hàng" : "Đóng"}
        </Button>
        {show && <Form />}
        <br />
        <br />
        <Table />
      </div>
    </Tabledata.Provider>
  );
};
export default Categories;
