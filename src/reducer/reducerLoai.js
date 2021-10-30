import callAPI from "../utils/api/callAPI";

const reducerLoai = (state, action) => {
  switch (action.type) {
    case "GETLIST":
      (async () => {
        const [error, resp] = await callAPI("/category/list");
        if (error) {
          console.log("Error: lấy danh sách loại bị lỗi");
          return false;
        }
        localStorage.setItem("categories", JSON.stringify(resp.data));
        return true;
      })();
      const json = JSON.parse(localStorage.getItem("categories"));
      state = json || state;
      localStorage.removeItem("categories");
      return state;

    case "TEST1":
      console.log("1");
      return state;
    case "TEST2":
      console.log("2");
      return state;
    default:
      return state;
  }
};
export default reducerLoai;
