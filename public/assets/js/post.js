// cap nhat nhanh bai viet
async function update_post(idpost, value, thaotac, element) {
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
  if (thaotac == 1) {
    value = value.replace(/\r\n|\r|\n/g, "<br>");
  }
  // tien hanh update
  if (thaotac != 2) fetchingOn();
  const [error, resp] = await okteamAPI(
    `/post/update/${idpost}?thaotac=${thaotac}&value=${value.trim()}`,
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
    console.log(object);
    if (thaotac == 0) {
      element.value = object.title;
    }
    if (thaotac == 1) {
      element.outerHTML = `<textarea onblur="zoomout(this)" onfocus="zoomin(this)" style="width:200px;height:50px" onchange="update_post('${idpost}', this.value, 1, this)">${object.content.replace(
        /<br\s?\/?>/g,
        "\n"
      )}</textarea>`;
    }
    return false;
  }
  if (thaotac == 2) getE(`#img_post_${idpost}`).src = value;
  if (thaotac == 0) {
    element.outerHTML = `<input onchange="update_post('${idpost}', this.value, ${thaotac}, this)" value="${value.trim()}">`;
  }
  if (thaotac == 1) {
    element.outerHTML = `<textarea onblur="zoomout(this)" onfocus="zoomin(this)" style="width:200px;height:50px" onchange="update_post('${idpost}', this.value, 1, this)">${value.replace(
      /<br\s?\/?>/g,
      "\n"
    )}</textarea>`;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}

function setImgPost(idpost) {
  getE(`#file_post_${idpost}`).click();
}
