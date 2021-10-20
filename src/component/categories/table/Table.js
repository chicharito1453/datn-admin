import Datatable from "../../../utils/datatable/Datatable";
import {
  headingsLoai,
  columnsLoai,
  urlLoai,
  eventLoai,
} from "../../../utils/datatable/configData";
import { useEffect } from "react";

const Table = () => {
  useEffect(() => {
    eventLoai.forEach((temp) => {
      if (temp.selector === "#id") {
        temp.operation = cohope;
      }
      if (temp.selector === "#name") {
        temp.operation = nohope;
      }
    });
  }, []);

  function nohope(value, thaotac) {
    console.log(thaotac, value);
  }
  function cohope(value) {
    console.log(value);
  }
  return (
    <Datatable
      id="dataTable"
      headings={headingsLoai}
      columns={columnsLoai}
      url={urlLoai}
      addEvents={eventLoai}
    />
  );
};
export default Table;
