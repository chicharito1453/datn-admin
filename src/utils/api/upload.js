import axios from "axios";

async function upload(image) {
  try {
    const dataImage = new FormData();
    dataImage.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    dataImage.append("file", image);
    const resp = await axios.post(process.env.REACT_APP_UPLOAD_URL, dataImage);
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}

export default upload;
