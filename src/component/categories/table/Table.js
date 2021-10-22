import Datatable from "../../../utils/datatable/Datatable";
import { columnsLoai } from "../../../utils/datatable/columns";
import { headingLoai } from "../../../utils/datatable/headings";
import reducerLoai from "../../../reducer/reducerLoai";
import { useEffect, useReducer } from "react";

const Table = () => {
  const [data, dispatch] = useReducer(reducerLoai, []);

  useEffect(() => {
    dispatch({ type: "GETLIST" });
  }, []);

  return (
    <Datatable
      id="dataTable"
      headings={headingLoai}
      columns={columnsLoai}
      data={data}
    />
  );
};
export default Table;
