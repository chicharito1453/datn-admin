import Datatable from "../../../utils/datatable/Datatable";
import { headingAdmin } from "../../../utils/datatable/headings";
import configAdmin from "../../../utils/datatable/config/configAdmin";

const TableAdmin = ({ data, deleted, getRow }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingAdmin}
      data={data}
      deleted={deleted}
      getRow={getRow}
      config={configAdmin}
    />
  );
};
export default TableAdmin;
