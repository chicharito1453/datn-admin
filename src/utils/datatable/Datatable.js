import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import { useEffect } from "react";
const jzip = require("jzip");
window.JSZip = jzip;

const Datatable = ({ id, headings, data, config }) => {
  useEffect(() => {
    var table = $("#" + id).DataTable(config);
    if (data.length === 0) return;
    table.clear().draw();
    table.rows.add(data).draw();
  }, [id, data, config]);

  return (
    <div className="table-responsive">
      <br />
      <table
        id={id}
        className="table table-striped table-borderless table-hover table-md table-responsive-sm"
        cellSpacing="0"
      >
        <thead className="thead-dark">
          <tr>
            {headings.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
export default Datatable;
