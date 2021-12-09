const configCmts = {
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
      data: "idcmt",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer" class="far fa-trash-alt"></i>`;
      },
    },
    {
      data: "idcmt",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width:100px;">${data}</div>`;
        }
        return data;
      },
    },
    {
      data: "ctv_cmt",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 90px;">${data.username}</div>`;
        }
        return data.username;
      },
    },
    {
      data: "content",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<p style="width: 150px">${data}</p>`;
        }
        return data;
      },
    },
    {
      data: "star",
      render: (data, type, row, meta) => {
        if (type === "display") {
          var stars = "";
          for (var i = 0; i < data; i++) {
            stars +=
              '<i style="color: #FBC740;font-size: 18px;" class="fas fa-star"></i>';
          }
          return `<div style="width: 150px; text-align: center;">${stars}</div>`;
        }
        return data;
      },
    },
    {
      data: "createdate",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 250px;" >${data}</div>`;
        }
        return data;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "400px" },
    // { targets: "_all", width: "70%" },
    { className: "text-center", targets: [1, 4] },
  ],
};
export default configCmts;
