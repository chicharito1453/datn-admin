const configNhan = {
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
    },
    {
      extend: "excelHtml5",
      text: '<div><i class="far fa-file-excel"></i> Excel</div>',
      className: "btn btn-success",
    },
    {
      extend: "csv",
      text: '<div><i class="fas fa-file-csv"></i> CSV</div>',
      className: "btn btn-secondary",
    },
    {
      extend: "print",
      text: '<div><i class="fas fa-print"></i> Print</div>',
      className: "btn btn-danger ",
    },
  ],
  columns: [
    {
      data: "id",
      render: function (data, type, full, meta) {
        return meta.row + 1;
      },
      className: "stt",
    },
    {
      data: "name",
      render: (data, type, row, meta) => {
        if (type === "display") {
          data = `<input onchange="update_nhan('${row.id}', this.value, '${data}', this)" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "id",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer" class="far fa-trash-alt"></i>`;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "400px" },
    // { targets: "_all", width: "70%" },
  ],
};
export default configNhan;
