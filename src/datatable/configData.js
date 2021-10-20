// Table loại
export const headingsLoai = ["Mã loại", "Tên loại"];
export const columnsLoai = [
  { data: "id" },
  {
    data: "last_name",
    render: (data, type, row, meta) =>
      `<input id="name" style="border: none;background-color: rgba(255, 100, 100, 0);" value="${data}" />`,
  },
];
export const urlLoai = "https://reqres.in/api/users?page=2";
