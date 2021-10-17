import Menu from "../component/common/Menu";
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
        <Menu />
      </div>
    </div>
  );
};
export default NavMobile;
