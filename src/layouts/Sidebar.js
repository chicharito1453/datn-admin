import Menu from "../common/Menu";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile_info">
        <img src="/assets/img/avatar.png" className="profile_image" alt="" />
        <h4>Định</h4>
      </div>
      <Menu />
    </div>
  );
};
export default Sidebar;
