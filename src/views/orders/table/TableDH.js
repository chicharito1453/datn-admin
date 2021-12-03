import Datatable from "../../../utils/datatable/Datatable";
import { headingDH } from "../../../utils/datatable/headings";
import configDH from "../../../utils/datatable/config/configDH";

const TableDH = ({ data, deleted, getRow }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingDH}
      data={data}
      deleted={deleted}
      getRow={getRow}
      config={configDH}
    />
  );
};
export default TableDH;
