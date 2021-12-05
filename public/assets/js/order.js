async function update_order(id, value, thaotac, oldValue, element) {
  if (thaotac != 0 && thaotac != 6) {
    if (!value.trim()) {
      Fail("Giá trị không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/order/reform/${id}?thaotac=${thaotac}&value=${value}`,
    "PUT"
  );
  if (error) {
    fetchingOff();
    Fail("Không thực hiện được thao tác!");
    console.log(error);
    return false;
  }
  const { object, message } = resp.data;
  if (!isOK(message)) {
    fetchingOff();
    Fail(message);
    element.value = oldValue;
    return false;
  }
  fetchingOff();
  if (thaotac != 0) Success("Cập nhật thông tin thành công!");
  if (thaotac == 0) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cập nhật thành công",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  if (thaotac != 0) {
    element.outerHTML = `<input onchange="update_order('${id}', this.value, ${thaotac}, '${value.trim()}', this)" value="${value.trim()}">`;
  }
  return true;
}
