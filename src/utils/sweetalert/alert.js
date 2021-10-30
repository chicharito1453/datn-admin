import swal from "sweetalert";

export var Success = (message, title = "Thông báo") => {
  swal({ icon: "success", title: title, text: message });
};

export var Fail = (message, title = "Thông báo") => {
  swal({ icon: "error", title: title, text: message });
};
