// CẬP NHẬT NHÃN
async function update_nhan(id, value, element) {
  value = value.toString();
  const [error, resp] = await okteamAPI(
    `/brand/update?id=${id}&value=${value}`,
    "PUT"
  );
  if (error) {
    Fail("Không thực hiện được thao tác!");
    console.log(error);
    return false;
  }
  const { result, message } = resp.data;
  if (!isOK(message)) {
    Fail(message);
    element.value = result[0].name;
    return false;
  }
  Success("Cập nhật thành công!");
  return true;
}
