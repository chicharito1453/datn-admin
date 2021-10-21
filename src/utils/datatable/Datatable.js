import "jquery/dist/jquery.min.js";
import $ from "jquery";
import configTable from "./configTable";
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

const Datatable = ({ id, headings, columns, data, addEvents, test }) => {
  useEffect(() => {
    var table = $("#" + id).DataTable({
      ...configTable,
      columns,
    });
    table.clear().draw();
    table.rows.add(data).draw();
    // addEvents.forEach((addEvent) => {
    //   const myFunction = setInterval(() => {
    //     var chooseer = document.querySelectorAll(
    //       "#" + id + " " + addEvent.selector
    //     );
    //     if (chooseer.length > 0) {
    //       chooseer.forEach((element) => {
    //         element.addEventListener(addEvent.event, () =>
    //           addEvent.operation(element.value, 2)
    //         );
    //       });
    //       clearInterval(myFunction);
    //     }
    //   }, 10);
    // });
  }, [id, columns, data, addEvents]);

  return (
    <div style={{ height: 600 }} className="table-responsive">
      <br />
      <table
        onChange={test}
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
