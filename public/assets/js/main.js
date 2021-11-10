// CẬP NHẬT LOẠI
async function update_loai(idcate, value, thaotac, oldValue, element) {
  if (thaotac == "1") {
    const [error, resp] = await okteam_upload(value);
    if (error) {
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
    Fail("Không thực hiện được thao tác!");
    console.log(error);
    return false;
  }
  const { message } = resp.data;
  if (!isOK(message)) {
    Fail(message);
    if (thaotac == "0") element.value = oldValue;
    if (thaotac == "2") {
      element.value = oldValue == "null" ? "" : oldValue;
    }
    return false;
  }
  if (thaotac == "1") $(`#img_loai_${idcate}`).src = value;
  Success("Cập nhật thành công!");
  return true;
}
// chon anh
function setImgLoai(idcate) {
  document.querySelector(`#file_loai_${idcate}`).click();
}

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
