// cap nhat thuoc tinh
async function update_tt(id, value, thaotac, element) {
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/properties/reform/${id}?thaotac=${thaotac}&value=${value.trim()}`,
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
    element.value = thaotac == 0 ? object.keyp : object.valuep;
    return false;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}
