async function update_ctv(username, value, thaotac, oldValue, element) {
  // password
  if (thaotac == 0) {
    if (!value.trim()) {
      Fail("Mật khẩu không hợp lệ!");
      return false;
    }
  }
  // fullname
  if (thaotac == 1) {
    if (!value.trim()) {
      Fail("Họ tên không hợp lệ!");
      element.value = oldValue;
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
  // address
  if (thaotac == 6) {
    if (!value.trim()) {
      Fail("Địa chỉ không hợp lệ!");
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
  const { message } = resp.data;
  if (!isOK(message)) {
    fetchingOff();
    Fail(message);
    return false;
  }
  if (thaotac == 2) getE(`#img_ctv_${username}`).src = value;
  if (thaotac == 0) element.value = "";
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  element.value = value.trim();
  return true;
}
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
function setImgCtv(username) {
  document.querySelector(`#file_ctv_${username}`).click();
}
