import axios from "axios";

async function okteam_upload(image) {
  try {
    const dataImage = new FormData();
    dataImage.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    dataImage.append("file", image);
    dataImage.append("folder", "datn");
    const resp = await axios.post(process.env.REACT_APP_UPLOAD_URL, dataImage);
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}

export default okteam_upload;
