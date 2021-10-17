import axios from "axios";

function callAPI(url, method = "GET", data = null) {
  return axios({
    method,
    url,
    data,
  }).catch((error) => {
    console.log("Error: ", error);
  });
}
export default callAPI;
