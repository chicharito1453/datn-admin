// url api okteam
const REACT_APP_API = "http://localhost:8080/api/v1";
const REACT_APP_UPLOAD_PRESET = "x2qgwhlm";
const REACT_APP_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/okteam/image/upload";

// selector
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//thông báo
const Success = (message, title = "Thông báo") => {
  swal({ icon: "success", title: title, text: message });
};

const Fail = (message, title = "Có lỗi xảy ra!") => {
  swal({ icon: "error", title: title, text: message });
};

function isOK(message) {
  return message == "OK";
}

//gọi api
async function callAPI(endpoint, method = "GET", data = null) {
  try {
    const resp = await axios({
      method,
      url: REACT_APP_API + endpoint,
      data,
    });
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}
