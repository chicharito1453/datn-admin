import { memo } from "react";
import Datatable from "../../../utils/datatable/Datatable";
import { headingTT } from "../../../utils/datatable/headings";
import configTT from "../../../utils/datatable/config/configTT";

const TableTT = ({ data, deleted }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingTT}
      data={data}
      deleted={deleted}
      config={configTT}
    />
  );
};
export default memo(TableTT);
