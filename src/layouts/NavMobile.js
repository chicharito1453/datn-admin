import menu from "../routes/menu";

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
        {menu.map((link, index) => (
          <a key={index} href={link.to}>
            <i className={link.classIcon}></i>
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
export default NavMobile;
