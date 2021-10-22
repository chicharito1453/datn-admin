// table loại
export const columnsLoai = [
  {
    data: "id",
    render: (data, type, row, meta) => {
      if (type === "display") {
        data = `<input style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`;
      }
      return data;
    },
  },
  {
    data: "name",
    render: (data, type, row, meta) => {
      if (type === "display") {
        data = `<input onchange="update_tenloai(${row.id},this.value)" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`;
      }
      return data;
    },
  },
];
