// table loại
export const columnsLoai = [
  {
    data: "id",
    render: (data, type, row, meta) => {
      if (type === "display") {
        data = `<input id="id" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`;
      }
      return data;
    },
  },
  {
    data: "name",
    render: (data, type, row, meta) => {
      if (type === "display") {
        data = `<input id="name" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`;
      }
      return data;
    },
  },
];
