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
      data: "idpost",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer" class="far fa-trash-alt"></i>`;
      },
    },
    {
      data: "idpost",
    },
    {
      data: "title",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_post('${row.idpost}', this.value, 0, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "content",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<textarea onblur="zoomout(this)" onfocus="zoomin(this)" style="width:200px;height:50px" onchange="update_post('${row.idpost}', this.value, 8, '${data}', this)">${data}</textarea>`;
        }
        return data;
      },
    },
    {
      data: "image",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
          id="img_post_${row.idpost}"
          src=${src}
          onclick="setImgPost('${row.idpost}')"
          width="70"
          height="70"
          alt=""
          style="cursor:pointer"
          className="img img-thumbnail pull-left"
        /><input id="file_post_${row.idpost}" type="file" style="display: none" onchange="update_loai('${row.idpost}', this.files[0], 1, '${data}', this)" />`;
      },
    },
    {
      data: "acc_post",
      render: (data, type, row, meta) => {
        return data.fullname;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "400px" },
    // { targets: "_all", width: "70%" },
  ],
};
export default configPost;
