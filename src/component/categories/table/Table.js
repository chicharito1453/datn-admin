import $ from "jquery";
import categories from "../../testApi/categories";
import configTable from "../../../utils/configTable";
import { useEffect } from "react";

const Table = () => {
  useEffect(() => {
    configTable.columns = [{ data: "id" }, { data: "name" }];
    var table = $("#dataTable").DataTable(configTable);
    table.clear().draw();
    table.rows.add(categories).draw();
  }, []);

  return (
    <div
      style={{ height: 600, overflowY: "hidden" }}
      className="table-responsive"
    >
      <br />
      <table
        id="dataTable"
        className="table table-striped table-borderless table-hover table-md table-responsive-sm"
        cellSpacing="0"
      >
        <thead className="thead-blue">
          <tr>
            <th>Mã loại</th>
            <th>Tên loại</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
export default Table;
