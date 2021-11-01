import Swal from "sweetalert2";

export var Success = (message, title = "Thông báo") => {
  Swal.fire({ icon: "success", title: title, text: message });
};

export var Fail = (message, title = "Có lỗi xảy ra!") => {
  Swal.fire({ icon: "error", title: title, text: message });
};
