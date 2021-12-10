import Datatable from "../../../utils/datatable/Datatable";
import { headingPost } from "../../../utils/datatable/headings";
import configPost from "../../../utils/datatable/config/configPost";

const TablePost = ({ data, deleted, getRow }) => {
  return (
    <Datatable
      id="dataTable"
      headings={headingPost}
      data={data}
      deleted={deleted}
      getRow={getRow}
      config={configPost}
    />
  );
};
export default TablePost;
