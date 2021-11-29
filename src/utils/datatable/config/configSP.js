const configSP = {
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
      data: "idpro",
      render: (data, type, row, meta) => {
        return `<div style="width:50px;"><i style="cursor:pointer" class="far fa-trash-alt"></i>&emsp;<i style="cursor:pointer" class="far fa-edit"></i></div>`;
      },
    },
    {
      data: "name",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_sp('${row.idpro}', this.value, 0, '${data}', this)"  value="${data}" />`;
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
          return `<input onchange="update_sp('${row.idpro}', this.value, 3, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "dvt",
      render: (data, type, row, meta) => {
        if (type === "display") {
          return `<input onchange="update_sp('${row.idpro}', this.value, 4, '${data}', this)"  value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "category",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<div style="width: 150px;">${data.typename}</div>`;
        return data;
      },
    },
    {
      data: "p_brand",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<div style="width: 150px;">${data.name}</div>`;
        return data;
      },
    },
    {
      data: "ncc",
      render: (data, type, row, meta) => {
        if (type === "display" || type === "export")
          return `<div style="width: 150px;">${data.fullname}</div>`;
        return data;
      },
    },
    {
      data: "image0",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
              id="img_sp0_${row.idpro}"
              src=${src}
              onclick="setImgSP0('${row.idpro}')"
              width="70"
              height="70"
              alt=""
              style="cursor:pointer"
              className="img img-thumbnail pull-left"
            /><input id="file_sp0_${row.idpro}" type="file" style="display: none" onchange="update_sp('${row.idpro}', this.files[0], 5, '${data}', this)" />`;
      },
    },
    {
      data: "image1",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
                id="img_sp1_${row.idpro}"
                src=${src}
                onclick="setImgSP1('${row.idpro}')"
                width="70"
                height="70"
                alt=""
                style="cursor:pointer"
                className="img img-thumbnail pull-left"
              /><input id="file_sp1_${row.idpro}" type="file" style="display: none" onchange="update_sp('${row.idpro}', this.files[0], 6, '${data}', this)" />`;
      },
    },
    {
      data: "image2",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
                id="img_sp2_${row.idpro}"
                src=${src}
                onclick="setImgSP2('${row.idpro}')"
                width="70"
                height="70"
                alt=""
                style="cursor:pointer"
                className="img img-thumbnail pull-left"
              /><input id="file_sp2_${row.idpro}" type="file" style="display: none" onchange="update_sp('${row.idpro}', this.files[0], 7, '${data}', this)" />`;
      },
    },
    {
      data: "image3",
      render: (data, type, row, meta) => {
        const src = data || "/assets/img/default.jpg";
        return ` <img
                id="img_sp3_${row.idpro}"
                src=${src}
                onclick="setImgSP3('${row.idpro}')"
                width="70"
                height="70"
                alt=""
                style="cursor:pointer"
                className="img img-thumbnail pull-left"
              /><input id="file_sp3_${row.idpro}" type="file" style="display: none" onchange="update_sp('${row.idpro}', this.files[0], 8, '${data}', this)" />`;
      },
    },
  ],
  columnDefs: [
    // { targets: [0], width: "10px" },
    // { targets: "_all", width: "130px" },
    //   { className: "text-center", targets: [1, 6] },
  ],
};
export default configSP;
