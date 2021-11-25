import { memo } from "react";
import Datatable from "../../../utils/datatable/Datatable";
import { headingNcc } from "../../../utils/datatable/headings";
import configNcc from "../../../utils/datatable/config/configNcc";

const TableNcc = ({ data }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingNcc}
      data={data}
      config={configNcc}
    />
  );
};
export default memo(TableNcc);
