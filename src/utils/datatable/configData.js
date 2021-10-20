// Table loại
export const headingsLoai = ["Mã loại", "Tên loại"];
export const columnsLoai = [
  {
    data: "id",
    render: (data, type, row, meta) =>
      `<input id="id" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`,
  },
  {
    data: "last_name",
    render: (data, type, row, meta) =>
      `<input id="name" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`,
  },
];
export const urlLoai = "https://reqres.in/api/users?page=2";
export const eventLoai = [
  {
    selector: "#name",
    event: "change",
  },
  {
    selector: "#id",
    event: "change",
  },
];
