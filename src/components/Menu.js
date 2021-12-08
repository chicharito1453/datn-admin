import { Link } from "react-router-dom";

const menuLink = [
  { to: "/", name: "Trang chủ", classIcon: "fas fa-home" },
  { to: "/admin/post", name: "Tin tức", classIcon: "fas fa-book-reader" },
  {
    to: "/admin/transaction",
    name: "Nạp rút tiền",
    classIcon: "fas fa-hand-holding-usd",
  },
  { to: "/admin/category", name: "Loại", classIcon: "fas fa-cogs" },
  { to: "/admin/brand", name: "Nhãn hiệu", classIcon: "fas fa-tags" },
  { to: "/admin/ncc", name: "Nhà cung cấp", classIcon: "fas fa-truck" },
  { to: "/admin/ctv", name: "Cộng tác viên", classIcon: "fas fa-users" },
  { to: "/admin/qtv", name: "Quản trị viên", classIcon: "fas fa-user-shield" },
  { to: "/admin/product", name: "Sản phẩm", classIcon: "fas fa-shopping-cart" },
  {
    to: "/admin/property",
    name: "Thuộc tính sp",
    classIcon: "fas fa-book-medical",
  },
  { to: "/admin/regipro", name: "Đăng ký sp", classIcon: "far fa-copyright" },
  { to: "/admin/order", name: "Đơn hàng", classIcon: "fas fa-box-open" },
  { to: "/admin/report", name: "Thống kê", classIcon: "fas fa-desktop" },
  { to: "", name: "", classIcon: "" },
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
