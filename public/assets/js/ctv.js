// cap nhat nhanh ctv
async function update_ctv(username, value, thaotac, oldValue, element) {
  // password
  if (thaotac == 0) {
    if (!value.trim()) {
      Fail("Mật khẩu không hợp lệ!");
      return false;
    }
  }
  // image
  if (thaotac == 2) {
    fetchingOn();
    const [error, resp] = await okteam_upload(value);
    if (error) {
      fetchingOff();
      Fail("Không upload được ảnh!");
      console.log(error);
      return false;
    }
    value = resp.data.secure_url;
  }
  // email
  if (thaotac == 4) {
    if (!regexEmail.test(value.trim())) {
      Fail("Email không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // sdt
  if (thaotac == 5) {
    if (!regexSDT.test(value.trim())) {
      Fail("Số điện thoại không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  if (thaotac != 2) {
    fetchingOn();
  }
  // tien hanh update
  const [error, resp] = await okteamAPI(
    `/ctv/reform/${username}?thaotac=${thaotac}&value=${value.trim()}`,
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
      element.value = object.fullname;
    }
    if (thaotac == 6) {
      element.value = object.address;
    }
    return false;
  }
  if (thaotac == 2) getE(`#img_ctv_${username}`).src = value;
  if (thaotac == 0) element.value = "";
  if (![0, 1, 2, 3, 6].includes(thaotac)) {
    element.outerHTML = `<input onchange="update_ctv('${username}', this.value, ${thaotac}, '${value.trim()}', this)" value="${value.trim()}">`;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}
// cap nhat nhanh trang thai ctv
async function update_trangthai_ctv(username, isChecked, element) {
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/ctv/update-trangthai?username=${username}`,
    "PUT"
  );
  if (error) {
    fetchingOff();
    Fail("Không thực hiện được thao tác!");
    console.log(error);
    element.checked = !isChecked;
    return false;
  }
  const { message } = resp.data;
  if (!isOK(message)) {
    fetchingOff();
    Fail(message);
    element.checked = !isChecked;
    return false;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}
// chon anh
function setImgCtv(username) {
  getE(`#file_ctv_${username}`).click();
}
