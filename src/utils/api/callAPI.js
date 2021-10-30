import axios from "axios";

async function callAPI(endpoint, method = "GET", data = null) {
  try {
    const resp = await axios({
      url: "http://localhost:8080/api/v1" + endpoint,
      method,
      data,
    });
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}
export default callAPI;
