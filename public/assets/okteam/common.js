const Success = (message, title = "Thông báo") => {
  swal({ icon: "success", title: title, text: message });
};

const Fail = (message, title = "Thông báo") => {
  swal({ icon: "error", title: title, text: message });
};
