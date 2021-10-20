import Datatable from "../../../datatables/Datatable";
import {
  headingsLoai,
  columnsLoai,
  urlLoai,
} from "../../../datatables/configData";
import { useEffect } from "react";

const Table = () => {
  useEffect(() => {
    var myFunction = setInterval(() => {
      var chooseer = document.querySelectorAll("#dataTable #name");
      if (chooseer.length > 0) {
        chooseer.forEach((element) => {
          element.addEventListener("change", () => nohope(element, 2));
        });
        clearInterval(myFunction);
      }
    }, 10);
  }, []);
  function nohope(element, thaotac) {
    console.log(thaotac, element.value);
  }
  return (
    <Datatable
      id="dataTable"
      headings={headingsLoai}
      columns={columnsLoai}
      url={urlLoai}
    />
  );
};
export default Table;
