import axios from "axios";

async function okteamAPI(endpoint, method = "GET", data = null) {
  try {
    const resp = await axios({
      url: process.env.REACT_APP_API + endpoint,
      method,
      data,
    });
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}
export default okteamAPI;
