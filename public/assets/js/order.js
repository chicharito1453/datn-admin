// cap nhat nhanh don hang
async function update_order(id, value, thaotac, oldValue, element) {
  if (![0, 1, 5, 6].includes(thaotac)) {
    if (!value.trim()) {
      Fail("Giá trị không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/order/reform/${id}?thaotac=${thaotac}&value=${value.trim()}`,
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
    if (thaotac == 1) {
      element.value = object.customer;
    }
    if (thaotac == 5) {
      element.value = object.address;
    }
    return false;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  if (thaotac == 0) {
    getE(`#datefinish-${id}`).innerHTML = object;
  }
  if (![0, 1, 5].includes(thaotac)) {
    element.outerHTML = `<input onchange="update_order('${id}', this.value, ${thaotac}, '${value.trim()}', this)" value="${value.trim()}">`;
  }
  return true;
}
