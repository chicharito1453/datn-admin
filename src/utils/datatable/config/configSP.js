const configSP = {
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
      data: "idpro",
      render: (data, type, row, meta) => {
        return `<i style="cursor:pointer" class="far fa-trash-alt"></i>`;
      },
    },
    {
      data: "idpro",
      render: (data, type, row, meta) => {
        return `<div style="cursor:pointer; width: 80px;><i style="cursor:pointer;" class="far fa-edit"></i></div>`;
      },
    },
    {
      data: "name",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_sp('${row.idpro}', this.value, 0, '', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "active",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input type="checkbox" onchange="update_trangthai_sp('${
            row.idpro
          }', this.checked, this)" style="width: 100px;" ${
            data && "checked"
          } />`;
        }
        if (type === "export") {
          return data ? "Đang mở bán" : "Không mở bán";
        }
        return data;
      },
    },
    {
      data: "pricectv",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input type="number" style="width: 200px" onchange="update_sp('${row.idpro}', this.value, 1, '${data}', this)" value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "qty",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input type="number" style="width: 100px" onchange="update_sp('${row.idpro}', this.value, 2, '${data}', this)" value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "origin",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_sp('${row.idpro}', this.value, 3, '', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "dvt",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_sp('${row.idpro}', this.value, 4, '', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "category",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<div style="width: 200px;">${data.typename}</div>`;
        return data.typename;
      },
    },
    {
      data: "p_brand",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<div style="width: 200px;">${data.name}</div>`;
        return data.name;
      },
    },
    {
      data: "ncc",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<div style="width: 200px;">${data.nccname}</div>`;
        return data.nccname;
      },
    },
    {
      data: "description",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<textarea onblur="zoomout(this)" onfocus="zoomin(this)" style="width:200px;height:50px" onchange="update_sp('${
            row.idpro
          }', this.value, 5, '', this)" >${data.replace(
            /<br\s?\/?>/g,
            "\n"
          )}</textarea>`;
        return data;
      },
    },
    {
      data: "image0",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
              id="img_6_sp_${row.idpro}"
              src=${src}
              onclick="setImgSP('${row.idpro}', 6)"
              width="70"
              height="70"
              alt=""
              style="cursor:pointer"
              className="img img-thumbnail pull-left"
            /><input id="file_6_sp_${row.idpro}" type="file" style="display: none" onchange="update_sp('${row.idpro}', this.files[0], 6, '${data}', this)" />`;
      },
    },
    {
      data: "image1",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
                id="img_7_sp_${row.idpro}"
                src=${src}
                onclick="setImgSP('${row.idpro}', 7)"
                width="70"
                height="70"
                alt=""
                style="cursor:pointer"
                className="img img-thumbnail pull-left"
              /><input id="file_7_sp_${row.idpro}" type="file" style="display: none" onchange="update_sp('${row.idpro}', this.files[0], 7, '${data}', this)" />`;
      },
    },
    {
      data: "image2",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
                id="img_8_sp_${row.idpro}"
                src=${src}
                onclick="setImgSP('${row.idpro}', 8)"
                width="70"
                height="70"
                alt=""
                style="cursor:pointer"
                className="img img-thumbnail pull-left"
              /><input id="file_8_sp_${row.idpro}" type="file" style="display: none" onchange="update_sp('${row.idpro}', this.files[0], 8, '${data}', this)" />`;
      },
    },
    {
      data: "image3",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
                id="img_9_sp_${row.idpro}"
                src=${src}
                onclick="setImgSP('${row.idpro}', 9)"
                width="70"
                height="70"
                alt=""
                style="cursor:pointer"
                className="img img-thumbnail pull-left"
              /><input id="file_9_sp_${row.idpro}" type="file" style="display: none" onchange="update_sp('${row.idpro}', this.files[0], 9, '${data}', this)" />`;
      },
    },
    {
      data: "createdate",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<div style="width: 150px;">${data || ""}</div>`;
        }
        return data;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "10px" },
    // { targets: "_all", width: "130px" },
    { className: "text-center", targets: [1, 2, 10] },
  ],
};
export default configSP;
