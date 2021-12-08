// xac nhan giao dich
async function update_duyet(idtran, isChecked, element) {
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/transaction/duyet?idtran=${idtran}`,
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
    element.checked = !isChecked;
    return false;
  }
  fetchingOff();
  Success("Xét duyệt yêu cầu thành công!");
  element.parentElement.innerHTML = `<i class="fas fa-check"></i><br /><b style="color: red;">Đã xác nhận</b>`;
  return true;
}
// huy giao dich
async function update_lydo(idtran, lydo, element) {
  if (!lydo.trim()) return;
  fetchingOn();
  const [error, resp] = await okteamAPI(
    `/transaction/huy/${idtran}?lydo=${lydo}`,
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
    element.value = "";
    return false;
  }
  fetchingOff();
  Success("Xét duyệt yêu cầu thành công!");
  element.parentElement.innerHTML = `<p><b>Lý do hủy:</b> ${lydo}</p>`;
  return true;
}
