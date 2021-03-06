const configLoai = {
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
      data: "idcate",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer" class="far fa-trash-alt"></i>`;
      },
    },
    {
      data: "idcate",
    },
    {
      data: "typename",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_loai('${row.idcate}', this.value, 0, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "img",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
        id="img_loai_${row.idcate}"
        src=${src}
        onclick="setImgLoai('${row.idcate}')"
        width="70"
        height="70"
        alt=""
        style="cursor:pointer"
        className="img img-thumbnail pull-left"
      /><input id="file_loai_${row.idcate}" type="file" style="display: none" onchange="update_loai('${row.idcate}', this.files[0], 1, '${data}', this)" />`;
      },
    },
    {
      data: "lv",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<select onchange="update_loai('${
            row.idcate
          }', this.value, 3, '${data}', this)" style="width: 100px;">
                      <option value="1" ${data === 1 && "selected"} >1</option>
                      <option value="2" ${data === 2 && "selected"} >2</option>
                  </select>`;
        }
        return data;
      },
    },
    {
      data: "parent",
      render: (data, type, row, meta) => {
        if (type === "display") {
          data = `<input onchange="update_loai('${
            row.idcate
          }',this.value, 2, '${data}', this)"  value="${data || ""}" />`;
        }
        return data;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "400px" },
    // { targets: "_all", width: "70%" },
  ],
};
export default configLoai;
