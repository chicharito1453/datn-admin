// cap nhat nhanh dang ky sp
async function update_regi(idregi, value, oldValue, element) {
  if (!value || +value < 0) {
    Fail("Giá không hợp lệ!");
    element.value = oldValue;
    return false;
  }
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/regi_products/update_gia/${idregi}?value=${+value}`,
    "PUT"
  );
  if (error) {
    fetchingOff();
    Fail("Không thực hiện được thao tác!");
    console.log(error);
    return false;
  }
  const { message } = resp.data;
  if (!isOK(message)) {
    fetchingOff();
    Fail(message);
    return false;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  element.outerHTML = `<input type="number" style="width: 150px" onchange="update_regi(${idregi}, this.value,  '${value}', this)" value="${value}">`;
  return true;
}
