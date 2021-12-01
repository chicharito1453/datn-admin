// cap nhat sp
async function update_sp(idpro, value, thaotac, oldValue, element) {
  // name
  if (thaotac == 0) {
    if (!value.trim()) {
      Fail("Tên không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // pricectv
  if (thaotac == 1) {
    if (!value.trim()) {
      Fail("Giá không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // qty
  if (thaotac == 2) {
    if (!value.trim()) {
      Fail("Số lượng không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // qty
  if (thaotac == 3) {
    if (!value.trim()) {
      Fail("Nơi sản xuất không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // qty
  if (thaotac == 4) {
    if (!value.trim()) {
      Fail("Đơn vị tính không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // image0, image1, image2, image3
  if ([6, 7, 8, 9].includes(thaotac)) {
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

  // tien hanh update
  if (![6, 7, 8, 9].includes(thaotac)) {
    fetchingOn();
  }
  const [error, resp] = await okteamAPI(
    `/products/reform/${idpro}?thaotac=${thaotac}&value=${value.trim()}`,
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
  if (![5, 6, 7, 8, 9].includes(thaotac)) {
    element.outerHTML = `<input onchange="update_sp('${idpro}', this.value, ${thaotac}, '${value.trim()}', this)" value="${value.trim()}">`;
  }
  if ([6, 7, 8, 9].includes(thaotac)) {
    getE(`#img_${thaotac}_sp_${idpro}`).src = value;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}
// cap nhat trang thai sp
async function update_trangthai_sp(idpro, isChecked, element) {
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/products/update-trangthai?idpro=${idpro}`,
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
function setImgSP(idpro, thaotac) {
  getE(`#file_${thaotac}_sp_${idpro}`).click();
}
