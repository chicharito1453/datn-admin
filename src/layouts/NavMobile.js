import { useEffect } from "react";
import Menu from "../components/Menu";

const NavMobile = () => {
  useEffect(() => {
    const $ = document.querySelector.bind(document);
    function toggleNav() {
      $(".mobile_nav_items").classList.toggle("active");
    }

    // Đóng mở nav khi responsive
    $(".nav_btn").addEventListener("click", toggleNav);

    return () => {
      $(".nav_btn").removeEventListener("click", toggleNav);
    };
  }, []);

  return (
    <div className="mobile_nav">
      <div className="nav_bar">
        <img
          src="/assets/img/avatar.png"
          className="mobile_profile_image"
          alt=""
        />
        <i className="fas fa-bars nav_btn"></i>
      </div>
      <div className="mobile_nav_items">
        <Menu />
      </div>
    </div>
  );
};
export default NavMobile;
