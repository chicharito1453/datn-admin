import Swal from "sweetalert2";

export const Success = (message, title = "Thông báo") => {
  Swal.fire({ icon: "success", title: title, text: message || title });
};

export const Fail = (message, title = "Có lỗi xảy ra!") => {
  Swal.fire({ icon: "error", title: title, text: message || title });
};

export const Approve = (message = "Vui lòng xác nhận", next) => {
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

export const Info = (message, title = "Thông báo") => {
  Swal.fire({ icon: "info", title: title, text: message || title });
};

export const isOK = (message) => {
  return message === "OK";
};
