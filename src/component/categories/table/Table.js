import Datatable from "../../../utils/datatable/Datatable";
import { headingLoai } from "../../../utils/datatable/headings";
import configLoai from "../../../utils/datatable/config/configLoai";
import reducerLoai from "../../../reducer/reducerLoai";
import { useLayoutEffect, useReducer } from "react";

const Table = () => {
  const [data, dispatch] = useReducer(reducerLoai, []);

  useLayoutEffect(() => {
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
