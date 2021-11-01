import Datatable from "../../../utils/datatable/Datatable";
import { headingLoai } from "../../../utils/datatable/headings";
import { memo } from "react";
import configLoai from "../../../utils/datatable/config/configLoai";

const Table = ({ data, deleted }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingLoai}
      data={data}
      deleted={deleted}
      config={configLoai}
    />
  );
};
export default memo(Table);
