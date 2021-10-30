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
      render: (data, type, row, meta) => {
        if (type === "display") {
          data = `<input style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "typename",
      render: (data, type, row, meta) => {
        if (type === "display") {
          data = `<input onchange="update_tenloai(${row.id},this.value)" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${data}" />`;
        }
        return data;
      },
    },
    {
      data: "img",
      render: (data, type, row, meta) => {
        if (type === "display") {
          const src = data || "/assets/img/default.jpg";
          data = ` <img
          src=${src}
          width="50"
          alt=""
          className="img img-thumbnail pull-left"
        />`;
        }
        return data;
      },
    },
    {
      data: "parent",
      render: (data, type, row, meta) => {
        if (type === "display") {
          data = `<input onchange="update_tenloai(${
            row.id
          },this.value)" style="border: none;background-color: rgba(0, 0, 0, 0);" value="${
            data || ""
          }" />`;
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
