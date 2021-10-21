import Datatable from "../../../utils/datatable/Datatable";
import {
  headingsLoai,
  columnsLoai,
  eventLoai,
} from "../../../utils/datatable/configData";
import reducerLoai from "../../../reducer/reducerLoai";
import { useEffect, useReducer } from "react";

const Table = () => {
  const [data, dispatch] = useReducer(reducerLoai, []);

  useEffect(() => {
    dispatch({ type: "GETLIST" });
  }, []);

  function test(e) {
    console.log(e.target.value);
  }

  return (
    <Datatable
      id="dataTable"
      test={test}
      headings={headingsLoai}
      columns={columnsLoai}
      data={data}
      addEvents={eventLoai}
    />
  );
};
export default Table;
