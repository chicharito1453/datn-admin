import menu from "../routes/menu";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile_info">
        <img src="/assets/img/avatar.png" className="profile_image" alt="" />
        <h4>Định</h4>
      </div>
      {menu.map((link, index) => (
        <a key={index} href={link.to}>
          <i className={link.classIcon}></i>
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
};
export default Sidebar;
