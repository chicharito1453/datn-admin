import { memo } from "react";
import Datatable from "../../../utils/datatable/Datatable";
import { headingAdmin } from "../../../utils/datatable/headings";
import configAdmin from "../../../utils/datatable/config/configAdmin";

const TableAdmin = ({ data, deleted }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingAdmin}
      data={data}
      deleted={deleted}
      config={configAdmin}
    />
  );
};
export default memo(TableAdmin);
