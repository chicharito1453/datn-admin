import Content from "./layouts/Content";
import Header from "./layouts/Header";
import NavMobile from "./layouts/NavMobile";
import Sidebar from "./layouts/Sidebar";
import React from "react";
import { useEffect, useCallback } from "react";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function App() {
  const setHeightPage = useCallback(() => {
    $(".content").style.height = window.innerHeight - 60 + "px";

    setTimeout(() => {
      const browserHeight = window.innerHeight;
      const contentHeight = document.body.scrollHeight;

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

      // Thiết lập chiều cao cho content khi load trang
      function setHeight() {
        $(".content").style.height =
          contentHeight >= browserHeight ? "auto" : browserHeight;
      }

      // Thiết lập chiều cao cho content khi resize
      window.onresize = function () {
        setHeight();
      };

      setHeight();
    }, 700);
  }, []);

  useEffect(() => {
    setHeightPage();
  }, [setHeightPage]);

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
