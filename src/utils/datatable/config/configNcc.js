const configNcc = {
  info: false,
  ordering: false,
  destroy: true,
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
      text: '<div><i class="fas fa-print" style="width: 20px;"></i> Print</div>',
      className: "btn btn-danger ",
      exportOptions: { orthogonal: "export" },
    },
  ],
  columns: [
    {
      data: "username",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer" class="far fa-trash-alt"></i>`;
      },
    },
    {
      data: "active",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input type="checkbox" onchange="update_trangthai_ncc('${row.username}', this.checked, this)" style="width: 100px;" checked="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "username",
    },
    {
      data: "password",
      render: (data, type, row, meta) => {
        if (type === "display") {
          data = `<input onchange="update_ncc('${row.username}', this.value, 0, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "nccname",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ncc('${row.username}', this.value, 1, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "ncclogo",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
            id="img_loai_${row.username}"
            src=${src}
            onclick="setImgNcc('${row.username}')"
            width="50"
            alt=""
            style="cursor:pointer"
            className="img img-thumbnail pull-left"
          /><input id="file_ncc_${row.username}" type="file" style="display: none" onchange="update_ncc('${row.username}', this.files[0], 2, '${data}', this)" />`;
      },
    },
    {
      data: "email",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ncc('${row.username}', this.value, 3, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "sdt",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ncc('${row.username}', this.value, 4, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "city",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ncc('${row.username}', this.value, 5, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "address",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ncc('${row.username}', this.value, 6, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "createdate",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 100px;">${data}</div>`;
        }
        return data;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "10px" },
    // { targets: "_all", width: "130px" },
  ],
};
export default configNcc;
