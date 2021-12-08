const configDH = {
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
      text: '<div><i class="fas fa-print" style="width: 20px;"></i> Print</div>',
      className: "btn btn-danger ",
      exportOptions: { orthogonal: "export" },
    },
  ],
  columns: [
    {
      data: "idorder",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer;" class="far fa-trash-alt"></i>`;
      },
    },
    {
      data: "idorder",
      render: (data, type, row, meta) => {
        return `<div style="cursor:pointer; width: 80px;><i style="cursor:pointer;" class="far fa-edit"></i></div>`;
      },
    },
    {
      data: "idorder",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 100px;">${data}</div>`;
        }
        return data;
      },
    },
    {
      data: "status",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<select style="width: 150px;" onchange="update_order('${
            row.idorder
          }', this.value, 0, '${data}', this)" style="width: 100px;">
                          <option value="0" ${
                            data === 0 && "selected"
                          } >Chờ xác nhận</option>
                          <option value="1" ${
                            data === 1 && "selected"
                          } >Giao thành công</option>
                          <option value="2" ${
                            data === 2 && "selected"
                          } >Đang giao</option>
                          <option value="3" ${
                            data === 3 && "selected"
                          } >Trả về</option>
                          <option value="4" ${
                            data === 4 && "selected"
                          } >Hủy</option>
                          <option value="5" ${
                            data === 5 && "selected"
                          } >Đã thanh toán</option>
                      </select>`;
        }
        return data;
      },
    },
    {
      data: "customer",
      render: (data, type, row, meta) => {
        return `<input style="width: 250px;" onchange="update_order('${row.idorder}', this.value, 1, '${data}', this)" value="${data}"   />`;
      },
    },
    {
      data: "sdtcustomer",
      render: (data, type, row, meta) => {
        return `<input onchange="update_order('${row.idorder}', this.value, 2, '${data}', this)" value="${data}"   />`;
      },
    },
    {
      data: "total",
      render: (data, type, row, meta) => {
        return `<div style="width: 250px;">${data}</div>`;
      },
    },
    {
      data: "payment",
      render: (data, type, row, meta) => {
        return `<div style="width: 250px;">${data}</div>`;
      },
    },
    {
      data: "ctv",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<div style="width: 200px;">${data.username}</div>`;
        return data.username;
      },
    },
    {
      data: "ncc",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<div style="width: 200px;">${data.username}</div>`;
        return data.username;
      },
    },
    {
      data: "tinh",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export") {
          var tinh = data.split("-");
          return `<div style="width: 200px;">${tinh[1]}</div>`;
        }
        return data;
      },
    },
    {
      data: "huyen",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export") {
          var huyen = data.split("-");
          return `<div style="width: 200px;">${huyen[1]}</div>`;
        }
        return data;
      },
    },
    {
      data: "xa",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export") {
          var xa = data.split("-");
          return `<div style="width: 200px;">${xa[1]}</div>`;
        }
        return data;
      },
    },
    {
      data: "address",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input style="width: 500px;" onchange="update_order('${row.idorder}', this.value, 5, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "order_code",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_order('${
            row.idorder
          }', this.value, 6, '${data}', this)"  value="${data || ""}" />`;
        }
        return data;
      },
    },
    {
      data: "dateorder",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 250px;">${data || ""}</div>`;
        }
        return data;
      },
    },
    {
      data: "datefinish",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div id='datefinish' style="width: 150px;">${
            data || ""
          }</div>`;
        }
        return data;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "10px" },
    // { targets: "_all", width: "130px" },
    { className: "text-center", targets: [1, 2, 6, 7] },
  ],
};
export default configDH;
