import { Link } from "react-router-dom";

const menuLink = [
  { to: "/", name: "Trang chủ", classIcon: "fas fa-home" },
  { to: "/admin/category", name: "Loại", classIcon: "fas fa-cogs" },
  { to: "/admin/brand", name: "Nhãn hàng", classIcon: "fas fa-tags" },
  { to: "/admin/ctv", name: "Cộng tác viên", classIcon: "fas fa-users" },
  { to: "/admin/ncc", name: "Nhà cung cấp", classIcon: "fas fa-truck" },
  { to: "/admin/product", name: "Sản phẩm", classIcon: "fas fa-shopping-cart" },
  { to: "/admin/order", name: "Đơn hàng", classIcon: "fas fa-box-open" },
  { to: "/admin/report", name: "Thống kê", classIcon: "fas fa-desktop" },
];
const Menu = () => {
  const redirect = (e) => {
    e.preventDefault();
    window.location = "https://www.youtube.com/";
  };

  return (
    <>
      {localStorage.getItem("myData") ? (
        menuLink.map((link, index) => {
          return (
            <Link key={index} to={link.to}>
              <i className={link.classIcon}></i>
              <span>{link.name}</span>
            </Link>
          );
        })
      ) : (
        <a href="/" onClick={redirect}>
          <i className="fas fa-shopping-cart"></i>
          <span>Web Okteam</span>
        </a>
      )}
    </>
  );
};
export default Menu;
