import { memo } from "react";
import Datatable from "../../../utils/datatable/Datatable";
import { headingSP } from "../../../utils/datatable/headings";
import configSP from "../../../utils/datatable/config/configSP";

const TableSP = ({ data, deleted, update }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingSP}
      data={data}
      deleted={deleted}
      update={update}
      config={configSP}
    />
  );
};
export default memo(TableSP);
