// cap nhat nhanh sp
async function update_sp(idpro, value, thaotac, oldValue, element) {
  // pricectv
  if (thaotac == 1) {
    if (!value || +value < 0) {
      Fail("Giá không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // qty
  if (thaotac == 2) {
    if (!value || +value < 0) {
      Fail("Số lượng không hợp lệ!");
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

  if (thaotac == 5) {
    value = value.replace(/\r\n|\r|\n/g, "<br>");
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
  const { object, message } = resp.data;
  if (!isOK(message)) {
    fetchingOff();
    Fail(message);
    if (thaotac == 0) {
      element.value = object.name;
    }
    if (thaotac == 3) {
      element.value = object.origin;
    }
    if (thaotac == 4) {
      element.value = object.dvt;
    }
    return false;
  }
  if ([1, 2].includes(thaotac)) {
    element.outerHTML = `<input type="number" onchange="update_sp('${idpro}', this.value, ${thaotac}, '${value.trim()}', this)" value="${value.trim()}">`;
  }
  if ([6, 7, 8, 9].includes(thaotac)) {
    getE(`#img_${thaotac}_sp_${idpro}`).src = value;
  }
  if (thaotac == 5) {
    element.outerHTML = `<textarea onblur="zoomout(this)" onfocus="zoomin(this)" style="width:200px;height:50px" onchange="update_sp('${idpro}', this.value, 5, '${value}', this)" >${value.replace(
      /<br\s?\/?>/g,
      "\n"
    )}</textarea>`;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}
// cap nhat nhanh trang thai sp
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
