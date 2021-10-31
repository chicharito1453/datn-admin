async function update_loai(idcate, value, thaotac, oldValue, element) {
  const [error, resp] = await callAPI(
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
  if (thaotac == "0") {
    element.value = value;
  }
  Success("Cập nhật thành công!");
  return true;
}
function setImgLoai() {
  document.querySelector("#anhLoai").click();
}

function delete_loai(id, index) {
  $("#dataTable").deleteRow(index);
}
