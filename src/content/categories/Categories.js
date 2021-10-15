import Form from "./form/Form";
import Table from "./table/Table";
import { useEffect } from "react";

const Categories = () => {
  useEffect(() => {
    document.title = "Quản trị - Loại hàng";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Loại sản phẩm</h1>
      <Form />
      <br />
      <br />
      <Table />
    </div>
  );
};
export default Categories;
