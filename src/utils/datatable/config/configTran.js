const configPost = {
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
      data: "idtran",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 80px;">${data}</div>`;
        }
        return data;
      },
    },
    {
      data: "username",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 120px;">${data}</div>`;
        }
        return data;
      },
    },
    {
      data: "type",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 120px;">${
            data === 0 ? "Nạp tiền" : "Rút tiền"
          }</div>`;
        }
        return data;
      },
    },
    {
      data: "done",
      render: (data, type, row, meta) => {
        if (type === "display") {
          if (data === 0) {
            return `<div align='center'><input type="checkbox" onchange="update_duyet('${row.idtran}', this.checked, this)" style="width:15px;height:15px;"/> duyệt
            <br /><input style="border: 1px solid;" placeholder="Nhập lý do hủy" onchange="update_lydo('${row.idtran}', this.value, this)" /></div>`;
          } else if (data === 1) {
            return `<i class="fas fa-check"></i><br /><b style="color: red;">Đã xác nhận</b>`;
          } else {
            return `<p><b>Lý do hủy:</b> ${row.note}</p>`;
          }
        }
        if (data === 0) {
          data = "Chờ xác nhận";
        } else if (data === 1) {
          data = "Đã xác nhận";
        } else {
          data = `Hủy: ${row.note}`;
        }
        return data;
      },
    },
    {
      data: "value",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 200px;">${data}</div>`;
        }
        return data;
      },
    },
    {
      data: "idpaypal",
    },
    {
      data: "createdate",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 270px;">${data}</div>`;
        }
        return data;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "400px" },
    // { targets: "_all", width: "70%" },
    { className: "text-center", targets: [0, 3, 4, 6] },
  ],
};
export default configPost;
