import Form from "./form/Form";
import Table from "./table/Table";
import { useEffect } from "react";

const NCC = () => {
  useEffect(() => {
    document.title = "Distributor Management";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Nhà cung cấp</h1>
      <Form />
      <br />
      <br />
      <Table />
    </div>
  );
};
export default NCC;
