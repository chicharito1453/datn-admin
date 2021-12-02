import Datatable from "../../../utils/datatable/Datatable";
import { headingDH } from "../../../utils/datatable/headings";
import configDH from "../../../utils/datatable/config/configDH";

const TableDH = ({ data, deleted }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingDH}
      data={data}
      deleted={deleted}
      config={configDH}
    />
  );
};
export default TableDH;
