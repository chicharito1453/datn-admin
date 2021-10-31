const configLoai = {
  info: false,
  ordering: false,
  destroy: true,
  pagingType: "full_numbers",
  pageLength: 5,
  lengthChange: false,
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
      data: "idcate",
    },
    {
      data: "typename",
      render: (data, type, row, meta) => {
        if (type === "display") {
          data = `<input onchange="update_loai('${row.idcate}', this.value, 0, '${data}', this)" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`;
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
        width="50"
        alt=""
        style="cursor:pointer"
        className="img img-thumbnail pull-left"
      /><input id="file_loai_${row.idcate}" type="file" style="display: none" onchange="update_loai('${row.idcate}', this.files[0], 1, '${data}', this)" />`;
      },
    },
    {
      data: "parent",
      render: (data, type, row, meta) => {
        if (type === "display") {
          data = `<input onchange="update_loai('${
            row.idcate
          }',this.value, 2, '${data}', this)" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${
            data || ""
          }" />`;
        }
        return data;
      },
    },
    {
      data: "idcate",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer" onclick="delete_loai('${data}',${meta.row})" class="far fa-trash-alt"></i>`;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "400px" },
    // { targets: "_all", width: "70%" },
  ],
};
export default configLoai;
