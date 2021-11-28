const configCtv = {
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
      data: "username",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 150px;">${data}</div>`;
        }
        return data;
      },
    },
    {
      data: "active",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input type="checkbox" onchange="update_trangthai_ctv('${
            row.username
          }', this.checked, this)" style="width: 100px;" ${
            data && "checked"
          } />`;
        }
        if (type === "export") {
          return data ? "Đã kích hoạt" : "Vô hiệu hóa";
        }
        return data;
      },
    },
    {
      data: "username",
      render: (data, type, row, meta) => {
        return `<input type="password" placeholder="Cập nhật mật khẩu mới" onchange="update_ctv('${row.username}', this.value, 0, '', this)"   />`;
      },
    },
    {
      data: "fullname",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ctv('${row.username}', this.value, 1, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "image",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
              id="img_ctv_${row.username}"
              src=${src}
              onclick="setImgCtv('${row.username}')"
              width="70"
              height="70"
              alt=""
              style="cursor:pointer"
              className="img img-thumbnail pull-left"
            /><input id="file_ctv_${row.username}" type="file" style="display: none" onchange="update_ctv('${row.username}', this.files[0], 2, '${data}', this)" />`;
      },
    },
    {
      data: "money",
      render: (data, type, row, meta) => {
        return `<div style="width: 250px;">${data
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</div>`;
      },
    },
    {
      data: "sex",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<select onchange="update_ctv('${
            row.username
          }', this.value, 3, '${data}', this)" style="width: 100px;">
                      <option value="Nam" ${
                        data === "Nam" && "selected"
                      } >Nam</option>
                      <option value="Nữ" ${
                        data === "Nữ" && "selected"
                      } >Nữ</option>
                      <option value="Khác" ${
                        data === "Khác" && "selected"
                      } >Khác</option>
                  </select>`;
        }
        return data;
      },
    },
    {
      data: "email",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ctv('${row.username}', this.value, 4, '${data}', this)" style="width: 300px;"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "sdt",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ctv('${row.username}', this.value, 5, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "address",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_ctv('${row.username}', this.value, 6, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "createdate",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 150px;">${data}</div>`;
        }
        return data;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "10px" },
    // { targets: "_all", width: "130px" },
    { className: "text-center", targets: [1, 6, 7] },
  ],
};
export default configCtv;
