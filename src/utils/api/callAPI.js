import axios from "axios";

async function callAPI(url, method = "GET", data = null) {
  try {
    const resp = await axios({
      url,
      method,
      data,
      headers: {
        token: process.env.REACT_APP_TOKENGHN,
      },
    });
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}
export default callAPI;
