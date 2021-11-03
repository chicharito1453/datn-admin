import Datatable from "../../../utils/datatable/Datatable";
import { headingNhan } from "../../../utils/datatable/headings";
import { memo } from "react";
import configNhan from "../../../utils/datatable/config/configNhan";

const TableNhan = ({ data, deleted }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingNhan}
      data={data}
      deleted={deleted}
      config={configNhan}
    />
  );
};
export default memo(TableNhan);
