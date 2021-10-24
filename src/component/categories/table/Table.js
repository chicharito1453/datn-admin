import Datatable from "../../../utils/datatable/Datatable";
import { headingLoai } from "../../../utils/datatable/headings";
import configLoai from "../../../utils/datatable/config/configLoai";
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
      data={data}
      config={configLoai}
    />
  );
};
export default Table;
