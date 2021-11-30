// cap nhat nhan
async function update_nhan(id, value, element) {
  value = value.toString();
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/brand/update?id=${id}&value=${value}`,
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
  Success("Cập nhật thành công!");
  return true;
}
