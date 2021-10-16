const menuLink = [
  { to: "/", name: "Trang chủ", classIcon: "fas fa-home" },
  { to: "/admin/category", name: "Loại", classIcon: "fas fa-cogs" },
  { to: "/admin/ctv", name: "Cộng tác viên", classIcon: "fas fa-users" },
  { to: "/admin/ncc", name: "Nhà cung cấp", classIcon: "fas fa-truck" },
  { to: "/admin/product", name: "Sản phẩm", classIcon: "fas fa-shopping-cart" },
  { to: "/admin/order", name: "Đơn hàng", classIcon: "fas fa-box-open" },
  { to: "/admin/report", name: "Thống kê", classIcon: "fas fa-desktop" },
];
const Menu = () => {
  return menuLink.map((link, index) => {
    return (
      <a key={index} href={link.to}>
        <i className={link.classIcon}></i>
        <span>{link.name}</span>
      </a>
    );
  });
};
export default Menu;
