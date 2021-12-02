import Datatable from "../../../utils/datatable/Datatable";
import { headingCtv } from "../../../utils/datatable/headings";
import configCtv from "../../../utils/datatable/config/configCtv";

const TableCtv = ({ data, deleted }) => {
  return (
    <Datatable
      id="dataTable"
      data={data}
      headings={headingCtv}
      deleted={deleted}
      config={configCtv}
    />
  );
};
export default TableCtv;
