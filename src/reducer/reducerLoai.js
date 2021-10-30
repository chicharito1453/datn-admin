import callAPI from "../utils/api/callAPI";
import { Fail } from "../utils/sweetalert/alert";
import { isOK } from "../common/isOk";

const reducerLoai = (state, action) => {
  switch (action.type) {
    case "GETLIST":
      (async () => {
        const [error, resp] = await callAPI("/category/list");
        if (error) {
          console.log("Error: lấy danh sách loại bị lỗi");
          return false;
        }
        const { result, message } = resp.data;
        if (!isOK(message)) {
          Fail(message);
          return false;
        }
        localStorage.setItem("categories", JSON.stringify(result));
        return true;
      })();
      const json = JSON.parse(localStorage.getItem("categories"));
      state = json || state;
      localStorage.removeItem("categories");
      return state;

    default:
      return state;
  }
};
export default reducerLoai;
