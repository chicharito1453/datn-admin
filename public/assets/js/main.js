async function update_loai(idLoai, value, thaotac, oldValue, element) {
  console.log();
  if (value.trim() == "") {
    element.value = oldValue;
    Fail("Không để trống!");
    return;
  }
  const [error, resp] = await callAPI("/category/list");
  if (error) {
    Fail("Không thực hiện được thao tác!");
    console.log(error);
    return false;
  }
  const { result, message } = resp.data;
  console.log(result);
}
function setImgLoai() {
  document.querySelector("#anhLoai").click();
}

function delete_loai(id, index) {
  $("#dataTable").deleteRow(index);
}
