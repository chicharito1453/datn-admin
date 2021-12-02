import Datatable from "../../../utils/datatable/Datatable";
import { headingSP } from "../../../utils/datatable/headings";
import configSP from "../../../utils/datatable/config/configSP";

const TableSP = ({ data, deleted, getRow }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingSP}
      data={data}
      deleted={deleted}
      getRow={getRow}
      config={configSP}
    />
  );
};
export default TableSP;
