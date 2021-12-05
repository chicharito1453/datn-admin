import Datatable from "../../../utils/datatable/Datatable";
import { headingNcc } from "../../../utils/datatable/headings";
import configNcc from "../../../utils/datatable/config/configNcc";

const TableNcc = ({ data, deleted, getRow }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingNcc}
      data={data}
      deleted={deleted}
      getRow={getRow}
      config={configNcc}
    />
  );
};
export default TableNcc;
