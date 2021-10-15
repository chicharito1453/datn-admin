const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile_info">
        <img src="/assets/img/avatar.png" className="profile_image" alt="" />
        <h4>Định</h4>
      </div>
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
  );
};
export default Sidebar;
