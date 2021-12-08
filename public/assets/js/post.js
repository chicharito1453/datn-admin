async function update_post(idpost, value, thaotac, oldValue, element) {
  // title
  if (thaotac == 0) {
    if (!value.trim()) {
      Fail("Tiêu đề không hợp lệ!");
      element.value = oldValue;
      return false;
    }
  }
  // content
  if (thaotac == 1) {
    if (!value.trim()) {
      Fail("Không để trống nội dung!");
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
  const { message } = resp.data;
  if (!isOK(message)) {
    fetchingOff();
    Fail(message);
    return false;
  }
  if (thaotac == 2) getE(`#img_post_${idpost}`).src = value;
  if (thaotac == 0) {
    element.outerHTML = `<input onchange="update_post('${idpost}', this.value, ${thaotac}, '${value.trim()}', this)" value="${value.trim()}">`;
  }
  if (thaotac == 1) {
    element.outerHTML = `<textarea onblur="zoomout(this)" onfocus="zoomin(this)" style="width:200px;height:50px" onchange="update_post('${idpost}', this.value, 1, '${value.trim()}', this)">${value.trim()}</textarea>`;
  }
  fetchingOff();
  Success("Cập nhật thông tin thành công!");
  return true;
}

function setImgPost(idpost) {
  getE(`#file_post_${idpost}`).click();
}
