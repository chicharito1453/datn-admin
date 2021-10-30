import Datatable from "../../../utils/datatable/Datatable";
import { headingLoai } from "../../../utils/datatable/headings";
import configLoai from "../../../utils/datatable/config/configLoai";
import { Tabledata } from "../Categories";
import { useContext } from "react";

const Table = () => {
  var { data } = useContext(Tabledata);

  return (
    <Datatable
      id="dataTable"
      headings={headingLoai}
      data={data}
      config={configLoai}
    />
  );
};
export default Table;
