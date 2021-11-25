import axios from "axios";
import { getToken } from "../localStorage/localStorage";

async function okteamAPI(endpoint, method = "GET", data = null) {
  const token = getToken();
  try {
    const resp = await axios({
      url: process.env.REACT_APP_GATE_V1 + endpoint,
      method,
      data,
      headers: { Authorization: "Bearer " + token },
    });
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}
export default okteamAPI;
