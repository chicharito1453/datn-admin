// cap nhat loai
async function update_loai(idcate, value, thaotac, oldValue, element) {
  fetchingOn();
  if (thaotac == "1") {
    const [error, resp] = await okteam_upload(value);
    if (error) {
      fetchingOff();
      Fail("Không upload được ảnh!");
      console.log(error);
      return false;
    }
    value = resp.data.secure_url;
  }
  const [error, resp] = await okteamAPI(
    `/category/update?idcate=${idcate}&value=${value.trim()}&thaotac=${thaotac}`,
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
    if (thaotac == "0") element.value = object.typename;
    if (thaotac == "2") {
      element.value = object.parent;
    }
    return false;
  }
  if (thaotac == "1") getE(`#img_loai_${idcate}`).src = value;
  if (thaotac == "2") element.value = value.toUpperCase();
  fetchingOff();
  Success("Cập nhật thành công!");
  return true;
}
// chon anh
function setImgLoai(idcate) {
  getE(`#file_loai_${idcate}`).click();
}
