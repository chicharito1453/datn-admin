async function update_ncc(username, value, thaotac, oldValue, element) {
  // password
  if (thaotac == 0) {
    if (!value.trim()) {
      Fail("Mật khẩu không hợp lệ!");
      return false;
    }
  }
  // nccname
  if (thaotac == 1) {
    if (!value.trim()) {
      Fail("Tên không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // ncclogo
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
  if (thaotac == 3) {
    if (!regexEmail.test(value.trim())) {
      Fail("Email không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // sdt
  if (thaotac == 4) {
    if (!regexSDT.test(value.trim())) {
      Fail("Số điện thoại không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // city
  if (thaotac == 5) {
    if (!value.trim()) {
      Fail("Thành phố không hợp lệ!");
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
    `/ncc/update/${username}?thaotac=${thaotac}&value=${value}`,
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
  if (thaotac == 2) getE(`#img_ncc_${username}`).src = value;
  if (thaotac == 0) element.value = "";
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}
async function update_trangthai_ncc(username, isChecked, element) {
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/ncc/update-trangthai?username=${username}`,
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
function setImgNcc(username) {
  document.querySelector(`#file_ncc_${username}`).click();
}
