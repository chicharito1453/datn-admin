// cap nhat nhanh nhan
async function update_nhan(id, value, element) {
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/brand/update?id=${id}&value=${value.trim()}`,
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
    element.value = object.name;
    return false;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}
