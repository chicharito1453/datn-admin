const configTable = {
  info: false,
  ordering: false,
  destroy: true,
  pagingType: "full_numbers",
  pageLength: 10,
  lengthChange: false,
  dom: "Bfrtip",
  buttons: [
    {
      extend: "copy",
      text: '<div><i class="fas fa-copy"></i> Copy</div>',
      className: "btn btn-primary",
    },
    {
      extend: "csv",
      text: '<div><i class="far fa-file-excel"></i> Excel</div>',
      className: "btn btn-success",
    },
    {
      extend: "print",
      text: '<div><i class="fas fa-print"></i> Print</div>',
      className: "btn btn-danger ",
    },
  ],
  columns: [],
};
export default configTable;
