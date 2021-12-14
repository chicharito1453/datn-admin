// url api okteam
const REACT_APP_GATE_V1 = "//www.bigmarketokteam.xyz:8080/datn/api/v1";
const REACT_APP_UPLOAD_PRESET = "x2qgwhlm";
const REACT_APP_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/okteam/image/upload";
// regex
const regexEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
const regexSDT = /^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

// selector
const getE = document.querySelector.bind(document);
const getEs = document.querySelectorAll.bind(document);

//thông báo
const Success = (message, title = "Thông báo") => {
  Swal.fire({ icon: "success", title: title, text: message || title });
};

const Fail = (message, title = "Có lỗi xảy ra!") => {
  Swal.fire({ icon: "error", title: title, text: message || title });
};

const Approve = (message = "Vui lòng xác nhận", next) => {
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

const Info = (message, title = "Thông báo") => {
  Swal.fire({ icon: "info", title: title, text: message || title });
};

function isOK(message) {
  return message == "OK";
}

// loading screen khi fetching
const fetchingOn = () =>
  $.LoadingOverlay("show", {
    image: "",
    background: "rgba(0, 0, 0, 0.4)",
    fontawesomeAnimation: "2000ms",
    fontawesome: "fas fa-sync-alt fa-spin",
    fontawesomeColor: "rgb(79, 79, 248)",
    fade: false,
  });

const fetchingOff = () => $.LoadingOverlay("hide");

// Thao tác với localStorage
const saveToLS = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
const getFromLS = (name = "myData") => JSON.parse(localStorage.getItem(name));
const removeFromLS = (name = "myData") => localStorage.removeItem(name);
const getToken = () => {
  return JSON.parse(localStorage.getItem("myData")).token;
};

// upload ảnh
async function okteam_upload(image) {
  try {
    const dataImage = new FormData();
    dataImage.append("upload_preset", REACT_APP_UPLOAD_PRESET);
    dataImage.append("file", image);
    dataImage.append("folder", "datn");
    const resp = await axios.post(REACT_APP_UPLOAD_URL, dataImage);
    return [null, resp];
  } catch (error) {
    return [error, null];
  }
}

//gọi api okteam
async function okteamAPI(endpoint, method = "GET", data = null) {
  const token = getToken();
  try {
    const resp = await axios({
      method,
      url: REACT_APP_GATE_V1 + endpoint,
      data,
      headers: { Authorization: "Bearer " + token },
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

// phóng to, thu nhỏ dùng cho giới thiệu, mộ tả
function zoomin(element) {
  element.style.width = "500px";
  element.style.height = "200px";
}
function zoomout(element) {
  element.style.width = "200px";
  element.style.height = "50px";
}
