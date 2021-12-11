// cap nhat ncc
async function update_ncc(username, value, thaotac, oldValue, element) {
  // password
  if (thaotac == 0) {
    if (!value.trim()) {
      Fail("Mật khẩu không hợp lệ!");
      return false;
    }
  }
  // fullname
  if (thaotac == 9) {
    if (!value.trim()) {
      Fail("Họ tên không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // nccname
  if (thaotac == 1) {
    if (!value.trim()) {
      Fail("Tên nhà cung cấp hợp lệ!");
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
  if (thaotac == 8) {
    value = value.replace(/\r\n|\r|\n/g, "<br>");
  }
  // tien hanh update
  const [error, resp] = await okteamAPI(
    `/ncc/update/${username}?thaotac=${thaotac}&value=${value.trim()}`,
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
    element.value = oldValue;
    return false;
  }
  if (thaotac == 2) getE(`#img_ncc_${username}`).src = value;
  if (thaotac == 0) element.value = "";
  if (![0, 2, 8].includes(thaotac)) {
    element.outerHTML = `<input onchange="update_ncc('${username}', this.value, ${thaotac}, '${value.trim()}', this)" value="${value.trim()}">`;
  }
  if (thaotac == 8) {
    element.outerHTML = `<textarea onblur="zoomout(this)" onfocus="zoomin(this)" style="width:200px;height:50px" onchange="update_ncc('${username}', this.value, 8, '${value}', this)">${value.replace(
      /<br\s?\/?>/g,
      "\n"
    )}</textarea>`;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}
// cap nhat trang thai ncc
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
// chon anh
function setImgNcc(username) {
  getE(`#file_ncc_${username}`).click();
}
