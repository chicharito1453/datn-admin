const configRegiP = {
  info: false,
  ordering: false,
  pagingType: "full_numbers",
  pageLength: 5,
  lengthChange: false,
  language: {
    emptyTable: "<b style='color:red'>Không có dữ liệu</b>",
  },
  dom: "Blfrtip",
  buttons: [
    {
      extend: "copy",
      text: '<div><i class="fas fa-copy"></i> Copy</div>',
      className: "btn btn-primary",
      exportOptions: { orthogonal: "export" },
    },
    {
      extend: "excelHtml5",
      text: '<div><i class="far fa-file-excel"></i> Excel</div>',
      className: "btn btn-success",
      exportOptions: { orthogonal: "export" },
    },
    {
      extend: "csv",
      text: '<div><i class="fas fa-file-csv"></i> CSV</div>',
      className: "btn btn-secondary",
      exportOptions: { orthogonal: "export" },
    },
    {
      extend: "print",
      text: '<div><i class="fas fa-print"></i> Print</div>',
      className: "btn btn-danger ",
      exportOptions: { orthogonal: "export" },
    },
  ],
  columns: [
    {
      data: "idregi",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer" class="far fa-trash-alt"></i>`;
      },
    },
    {
      data: "idregi",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width:80px;">${data}</div>`;
        }
        return data;
      },
    },
    {
      data: "ctv",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 90px;">${data.username}</div>`;
        }
        return data.username;
      },
    },
    {
      data: "price",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input type="number" style="width: 150px" onchange="update_regi(${row.idregi}, this.value,  '${data}', this)" value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "products",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<p style="width: 300px;">${data.name}</p>`;
        }
        return data.name;
      },
    },
    {
      data: "products",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 90px;" >${data.ncc.username}</div>`;
        }
        return data.ncc.username;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "400px" },
    // { targets: "_all", width: "70%" },
    { className: "text-center", targets: [1, 2, 3] },
  ],
};
export default configRegiP;
