import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import { useLayoutEffect, memo } from "react";
const jzip = require("jzip");
window.JSZip = jzip;

const Datatable = ({ id, headings, data, config, deleted }) => {
  useLayoutEffect(() => {
    if (!Array.isArray(data)) return;
    var table = $("#" + id).DataTable(config);
    table.clear().draw();
    table.rows.add(data).draw();
    table.on("click", "tbody td .fa-trash-alt", function () {
      deleted(table.row($(this).parents("tr")).data());
    });
    document.querySelector(".table-responsive").style.display = "block";
  }, [id, data, config, deleted]);

  return (
    <div
      className="table-responsive"
      style={{ minHeight: 500, display: "none" }}
    >
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
export default memo(Datatable);
