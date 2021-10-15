import Content from "./layouts/Content";
import Header from "./layouts/Header";
import NavMobile from "./layouts/NavMobile";
import Sidebar from "./layouts/Sidebar";
import React from "react";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    var browserHeight = window.innerHeight;
    var contentHeight = document.documentElement.scrollHeight;

    // Khi thu Sidebar thì set tittle cho thẻ a trong sidebar
    $("#check").onchange = function () {
      var check = this.checked;
      $$(".sidebar a").forEach((element) => {
        element.title = check ? element.text : "";
      });
    };

    // Đóng mở nav khi responsive
    $(".nav_btn").onclick = function (e) {
      $(".mobile_nav_items").classList.toggle("active");
    };

    // Thiết lập chiều cao cho content
    function setHeight() {
      $(".content").style.height =
        contentHeight > browserHeight ? "auto" : "100vh";
    }

    // Thiết lập chiều cao cho content khi resize
    window.addEventListener("resize", function (event) {
      setHeight();
    });
    setHeight();
  }, []);

  return (
    <React.Fragment>
      <input type="checkbox" id="check" />
      <Header />
      <NavMobile />
      <Sidebar />
      <Content />
    </React.Fragment>
  );
}

export default App;
