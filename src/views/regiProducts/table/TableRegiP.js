import Datatable from "../../../utils/datatable/Datatable";
import { headingRegiP } from "../../../utils/datatable/headings";
import configRegiP from "../../../utils/datatable/config/configRegiP";

const TableRegiP = ({ data, deleted }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingRegiP}
      data={data}
      deleted={deleted}
      config={configRegiP}
    />
  );
};
export default TableRegiP;
