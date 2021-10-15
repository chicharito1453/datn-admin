import Table from "./table/Table";
import Form from "./form/Form";
import { useEffect } from "react";

const CTV = () => {
  useEffect(() => {
    document.title = "Collaborator Management";
  }, []);

  return (
    <div className="container">
      <h1 className="hit-the-floor">Cộng tác viên</h1>
      <Form />
      <br />
      <br />
      <Table />
    </div>
  );
};
export default CTV;
