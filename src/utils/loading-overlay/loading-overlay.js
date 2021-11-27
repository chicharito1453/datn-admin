import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";

export const fetchingOn = () =>
  $.LoadingOverlay("show", {
    image: "",
    background: "rgba(0, 0, 0, 0.4)",
    fontawesomeAnimation: "2000ms",
    fontawesome: "fas fa-sync-alt fa-spin",
    fontawesomeColor: "rgb(79, 79, 248)",
    fade: false,
  });

export const fetchingOff = () => $.LoadingOverlay("hide");
