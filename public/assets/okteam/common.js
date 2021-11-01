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
  Swal.fire({ icon: "success", title: title, text: message });
};

const Fail = (message, title = "Có lỗi xảy ra!") => {
  Swal.fire({ icon: "error", title: title, text: message });
};

const Approve = (message, next) => {
  Swal.fire({
    icon: "warning",
    title: "Xác nhận",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Đồng ý",
    confirmButtonColor: "#d33",
    cancelButtonText: "Hủy bỏ",
  }).then((result) => {
    if (result.value) {
      next();
    }
  });
};

function isOK(message) {
  return message == "OK";
}

// upload ảnh
async function okteam_upload(image) {
  try {
    const dataImage = new FormData();
    dataImage.append("upload_preset", REACT_APP_UPLOAD_PRESET);
    dataImage.append("file", image);
    const resp = await axios.post(REACT_APP_UPLOAD_URL, dataImage);
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}

//gọi api okteam
async function okteamAPI(endpoint, method = "GET", data = null) {
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

// gọi api
async function callAPI(url, method = "GET", data = null) {
  try {
    const resp = await axios({
      method,
      url,
      data,
    });
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}
