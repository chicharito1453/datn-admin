const NavMobile = () => {
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
        <a href="/">
          <i className="fas fa-home"></i>
          <span>Trang chủ</span>
        </a>
        <a href="/admin/category">
          <i className="fas fa-cogs"></i>
          <span>Loại</span>
        </a>
        <a href="/admin/ctv">
          <i className="fas fa-users"></i>
          <span>Cộng tác viên</span>
        </a>
        <a href="/admin/ncc">
          <i className="fas fa-truck"></i>
          <span>Nhà cung cấp</span>
        </a>
        <a href="/admin/product">
          <i className="fas fa-shopping-cart"></i>
          <span>Sản phẩm</span>
        </a>
        <a href="/admin/order">
          <i className="fas fa-box-open"></i>
          <span>Đơn hàng</span>
        </a>
        <a href="/admin/report">
          <i className="fas fa-desktop"></i>
          <span>Thống kê</span>
        </a>
      </div>
    </div>
  );
};
export default NavMobile;
