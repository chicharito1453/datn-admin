import callAPI from "../utils/api/callAPI";

const reducerLoai = (state, action) => {
  switch (action.type) {
    case "GETLIST":
      (async () => {
        const [error, resp] = await callAPI(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (error) {
          console.log("Error");
          return false;
        }
        localStorage.setItem("categories", JSON.stringify(resp.data));
        return true;
      })();
      state = JSON.parse(localStorage.getItem("categories"));
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
